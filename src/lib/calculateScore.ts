export function calculateScore(
    matchedSchemes: any[]
  ) {
    const totalPossible = 20;
  
    const utilized = matchedSchemes.length;
  
    const score = Math.min(
      Math.round((utilized / totalPossible) * 100),
      100
    );
  
    return {
      score,
      utilized,
      totalPossible,
      missing: totalPossible - utilized,
    };
  }