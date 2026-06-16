export function calculateBenefitScore(
    profile: any
  ) {
    let score = 100;
  
    if (!profile.aadhaar) score -= 25;
  
    if (!profile.mobile) score -= 15;
  
    if (!profile.income) score -= 20;
  
    if (!profile.categories?.length) score -= 20;
  
    return score;
  }