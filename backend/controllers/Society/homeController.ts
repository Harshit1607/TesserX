import { Request, Response } from 'express';
import Company from '../../models/Companies';
import Society from '../../models/Societies';
import Event from '../../models/Events';
import { calculateMatchScore, fuzzyMatch } from '../../utils/matchUtils';
import { getFuzzyScore } from '../../utils/getFuzzyScore';

export const sendBySearch = async (req: Request, res: Response) => {
  try {
    const { nameQuery } = req.query;
    if (!nameQuery) return res.status(400).json({ message: 'Missing name query' });

    const query = String(nameQuery).toLowerCase();
    const allCompanies = await Company.find();

    const companiesWithScore = allCompanies.map((company) => ({
      company,
      score: getFuzzyScore(company.name, query),
    }));

    // Always return all companies, sorted by similarity
    const sorted = companiesWithScore.sort((a, b) => b.score - a.score);

    res.json({ results: sorted });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};

// 1️⃣ Main Function - Match sponsors for a society
export const matchSponsorsForSociety = async (req: Request, res: Response) => {
  try {
    const { societyId } = req.params;
    const { minBudget, maxBudget, type, nameQuery } = req.query;

    // Fetch the society and populate its events
    const society = await Society.findById(societyId).populate('events');
    if (!society) return res.status(404).json({ message: 'Society not found' });

    // Fetch all companies
    const allCompanies = await Company.find();
    const matches: { company: any; score: number }[] = [];

    // Matching sponsors with events
    for (const company of allCompanies) {
      for (const eventId of society.events) {
        const event = await Event.findById(eventId);
        if (!event) continue; // If event not found, skip

        const score = calculateMatchScore(
          {
            event_type: company.industry,
            target_audience: 'students',
            budget: company.budget,
            location: company.location,
          },
          {
            event_type: event.event_type,
            target_audience: event.target_audience,
            budget: event.budget,
            location: society.college,
          }
        );
        matches.push({ company, score });
      }
    }

    // Apply filters if provided
    let filteredMatches = matches;

    if (minBudget && maxBudget) {
      filteredMatches = filterByBudget(filteredMatches, Number(minBudget), Number(maxBudget));
    }

    if (type) {
      filteredMatches = filterByType(filteredMatches, String(type));
    }

    if (nameQuery) {
      filteredMatches = filterByNameFuzzy(filteredMatches, String(nameQuery));
    }

    // Sort by score
    filteredMatches.sort((a, b) => b.score - a.score);

    // Return only name and description
    const simplifiedMatches = filteredMatches.map(({ company, score }) => ({
      id: company._id,
      name: company.name,
      description: company.desc,
      score,
    }));

    res.json({ matches: simplifiedMatches });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};


// 2️⃣ Budget Filter
export const filterByBudget = (companies: any[], min: number, max: number) => {
  return companies.filter((c) => {
    const budget = c.company.budget || 0;
    return budget >= min && budget <= max;
  });
};

// 3️⃣ Type Filter
export const filterByType = (companies: any[], type: string) => {
  return companies.filter((c) => c.company.industry?.toLowerCase() === type.toLowerCase());
};

// 4️⃣ Name Search Filter (Fuzzy)
export const filterByNameFuzzy = (companies: any[], query: string) => {
  return companies.filter((c) => {
    const score = fuzzyMatch(c.company.name.toLowerCase(), query.toLowerCase());
    return score > 0.6; // threshold: 60%
  });
};

export const getProposal = async (req: Request, res: Response) => {
  try {
    const { companyId } = req.query;

    if (!companyId) {
      return res.status(400).json({ message: 'Missing companyId' });
    }

    const company = await Company.findById(companyId);

    if (!company) {
      return res.status(404).json({ message: 'Company not found' });
    }

    res.json({ proposal: company.proposal });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};

export const getProfile = async (req: Request, res: Response) => {
  try {
    const { id } = req.query;
    if (!id) return res.status(400).json({ message: 'Missing company ID' });

    const company = await Company.findById(id);
    if (!company) return res.status(404).json({ message: 'Company not found' });

    res.json({ company });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};

export const sendByFilter = async (req: Request, res: Response) => {
  try {
    const { minBudget, maxBudget, type } = req.query;
    const allCompanies = await Company.find();

    let filtered = allCompanies;

    if (minBudget && maxBudget) {
      filtered = filtered.filter((c) => {
        const budget = c.budget || 0;
        return budget >= Number(minBudget) && budget <= Number(maxBudget);
      });
    }

    if (type) {
      filtered = filtered.filter((c) => c.industry?.toLowerCase() === String(type).toLowerCase());
    }

    res.json({ results: filtered });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};