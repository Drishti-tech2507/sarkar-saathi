import Scheme from "@/models/Scheme";

interface MatchResult {
  scheme: any;
  score: number;
  reasons: string[];
}

export async function matchSchemes(
  profile: any
): Promise<MatchResult[]> {
  const schemes = await Scheme.find({
    active: true,
  });

  const matches: MatchResult[] = [];

  for (const scheme of schemes) {
    const e = scheme.eligibility || {};

    let score = 0;
    const reasons: string[] = [];

    const age = Number(profile.age) || 0;
    const income =
      Number(profile.income) || 0;

    // ==========================
    // OCCUPATION (STRICT)
    // ==========================
    if (
      e.occupation?.length > 0
    ) {
      if (
        !e.occupation.includes(
          profile.occupation
        )
      ) {
        continue;
      }

      score += 25;

      reasons.push(
        `Applicable for ${profile.occupation}`
      );
    }

    // ==========================
    // GENDER (STRICT)
    // ==========================
    if (
      e.gender?.length > 0
    ) {
      if (
        !e.gender.includes(
          profile.gender
        )
      ) {
        continue;
      }

      score += 20;

      reasons.push(
        `Eligible for ${profile.gender}`
      );
    }

    // ==========================
    // EDUCATION
    // ==========================
    if (
      e.education?.length > 0
    ) {
      if (
        !e.education.includes(
          profile.education
        )
      ) {
        continue;
      }

      score += 15;

      reasons.push(
        "Education criteria matched"
      );
    }

    // ==========================
    // CATEGORY
    // ==========================
    if (
      e.categories?.length > 0
    ) {
      const matched =
        profile.categories?.some(
          (cat: string) =>
            e.categories.includes(cat)
        );

      if (!matched) {
        continue;
      }

      score += 20;

      reasons.push(
        "Social category eligible"
      );
    }

    // ==========================
    // AGE (STRICT)
    // ==========================
    if (
      age <
        (e.ageMin || 0) ||
      age >
        (e.ageMax || 120)
    ) {
      continue;
    }

    score += 10;

    reasons.push(
      "Age criteria satisfied"
    );

    // ==========================
    // INCOME (STRICT)
    // ==========================
    if (
      income >
      (e.incomeLimit ||
        999999999)
    ) {
      continue;
    }

    score += 15;

    reasons.push(
      "Income criteria satisfied"
    );

    // ==========================
    // BPL (STRICT)
    // ==========================
    if (e.bplOnly) {
      if (
        profile.bpl !== "Yes"
      ) {
        continue;
      }

      score += 20;

      reasons.push(
        "BPL beneficiary eligible"
      );
    }

    // ==========================
    // STATE
    // ==========================
    if (
      scheme.state?.includes(
        "All"
      )
    ) {
      score += 10;

      reasons.push(
        "Available across India"
      );
    } else if (
      profile.state &&
      scheme.state?.includes(
        profile.state
      )
    ) {
      score += 10;

      reasons.push(
        `Available in ${profile.state}`
      );
    } else {
      continue;
    }

    matches.push({
      scheme,
      score,
      reasons,
    });
  }

  return matches.sort(
    (a, b) => b.score - a.score
  );
}