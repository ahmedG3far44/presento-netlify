// import credentials from "../../../credentials/credentials";
import ItemsList from "../../../components/ui/nav/ItemsList";
import ExperienceSection from "../../../components/ui/sections/ExperienceSection";

async function ExperiencesPage({ params }) {
  const { userId } = params;
  // const { user } = await credentials();
  const experiencesList = await getExperiencesList(userId);
  return (
    <section className="w-full min-h-screen flex flex-col justify-start items-start px-8 gap-8 p-4">
      <ExperienceSection />
      <main className="w-full min-h-screen m-auto overflow-x-hidden">
        <ItemsList list={experiencesList} sectionName={"experiences"} />
      </main>
    </section>
  );
}

async function getExperiencesList(userId) {
  try {
    const request = await fetch(
      `http://localhost:4000/api/${userId}/experiences`
    );
    const data = request.json();
    return data;
  } catch (error) {
    return {
      error: "can't get experiences list",
      message: error.message,
    };
  }
}
export default ExperiencesPage;
