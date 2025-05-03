import { token_set_ratio } from 'fuzzball';

const weights = {
  event_type: 0.3,
  target_audience: 0.2,
  budget: 0.22,
  location: 0.28,
};

export function fuzzyMatch(str1: string, str2: string): number {
  const score = token_set_ratio(str1 || '', str2 || '');
  return score / 100;
}

export function calculateMatchScore(
  company: any,
  society: any
): number {
  let score = 0;

  const eventMatchScore = fuzzyMatch(company.event_type, society.event_type);
  score += eventMatchScore * weights.event_type;

  if (company.target_audience === society.target_audience) {
    score += 1 * weights.target_audience;
  }

  // Modified budget ratio comparison
  const companyBudget = company.budget || 1;
  const societyBudget = society.budget || 1;
  const budgetDiff = Math.abs(companyBudget - societyBudget);
  const budgetAvg = (companyBudget + societyBudget) / 2;

  if (budgetDiff / budgetAvg <= 0.15) {
    // Budgets within 15% range
    score += 1 * weights.budget;
  } else {
    // Partial match based on ratio
    const budgetRatio = Math.min(societyBudget / companyBudget, 1);
    score += budgetRatio * weights.budget;
  }

  if (company.location === society.location) {
    score += 1 * weights.location;
  } else if (
    company.location?.split(' ').pop() === society.location?.split(' ').pop()
  ) {
    score += 0.5 * weights.location;
  }

  return score;
}
