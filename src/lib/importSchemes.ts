import Scheme from "@/models/Scheme";

export async function importSchemes(
  schemes: any[]
) {
  let inserted = 0;
  let updated = 0;

  for (const scheme of schemes) {
    const existing = await Scheme.findOne({
      name: scheme.name,
    });

    if (existing) {
      await Scheme.updateOne(
        { _id: existing._id },
        { $set: scheme }
      );

      updated++;
    } else {
      await Scheme.create(scheme);
      inserted++;
    }
  }

  return {
    inserted,
    updated,
  };
}