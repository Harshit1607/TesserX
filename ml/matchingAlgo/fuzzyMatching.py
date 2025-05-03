from fuzzywuzzy import fuzz

company_profile = {
    'event_type': 'tech', 
    'target_audience': 'students', 
    'budget': 50000, 
    'location': 'New Delhi',  
}

society_profiles = [
    {
        'event_type': 'tech',
        'target_audience': 'students',
        'budget_needed': 30000,
        'location': 'New Delhi'
    },
    {
        'event_type': 'cultural',
        'target_audience': 'general public',
        'budget_needed': 60000,
        'location': 'Mumbai'
    },
]

weights = {
    'event_type': 0.3,
    'target_audience': 0.2,
    'budget': 0.22,
    'location': 0.28
}

def fuzzy_event_type_match(company_event, society_event):
    match_score = fuzz.token_set_ratio(company_event, society_event)  
    return match_score / 100  

def calculate_match_score(company, society, weights):
    score = 0
    
    # Event type match using fuzzy matching
    event_match_score = fuzzy_event_type_match(company['event_type'], society['event_type'])
    score += event_match_score * weights['event_type']
    
    # Target audience match (binary score)
    if company['target_audience'] == society['target_audience']:
        score += 1 * weights['target_audience']
    

    company_budget = company['budget']
    society_budget_needed = society['budget_needed']
    
    budget_score = min(society_budget_needed / company_budget, 1)  
    score += budget_score * weights['budget']
    
    # Location match 
    if company['location'] == society['location']:
        score += 1 * weights['location']  # Exact match
    elif company['location'].split()[-1] == society['location'].split()[-1]: 
        score += 0.5 * weights['location']  # Partial/close match

    return score

matches = []
for society in society_profiles:
    score = calculate_match_score(company_profile, society, weights)
    matches.append((society, score))

matches = sorted(matches, key=lambda x: x[1], reverse=True)

for match in matches:
    print(f"Society: {match[0]}, Match Score: {match[1]:.2f}")