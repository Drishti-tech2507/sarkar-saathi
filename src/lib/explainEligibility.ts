export function explainEligibility(
    profile: any,
    scheme: any
  ) {
    const reasons: string[] = [];
  
    if (
      profile.occupation &&
      scheme.category?.includes(
        profile.occupation
      )
    ) {
      reasons.push(
        `Occupation matched (${profile.occupation})`
      );
    }
  
    if (
      profile.categories &&
      Array.isArray(profile.categories)
    ) {
      profile.categories.forEach(
        (cat: string) => {
          if (
            scheme.category?.includes(cat)
          ) {
            reasons.push(
              `Category matched (${cat})`
            );
          }
        }
      );
    }
  
    if (
      profile.bpl === "Yes" &&
      scheme.category?.includes("BPL")
    ) {
      reasons.push(
        "BPL eligibility satisfied"
      );
    }
  
    if (
      scheme.incomeLimit &&
      profile.income
    ) {
      const income =
        Number(
          String(profile.income).replace(
            /[^\d]/g,
            ""
          )
        ) || 0;
  
      if (income <= scheme.incomeLimit) {
        reasons.push(
          `Income below ₹${scheme.incomeLimit.toLocaleString()}`
        );
      }
    }
  
    if (
      profile.education &&
      scheme.category?.includes("Student")
    ) {
      reasons.push(
        `Education level: ${profile.education}`
      );
    }
  
    return reasons;
  }