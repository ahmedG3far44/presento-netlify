// import credentials from "../../../credentials/credentials";
import ProjectsSection from "../../../components/ui/sections/ProjectsSection";
import ItemsList from "../../../components/ui/nav/ItemsList";

async function ProjectsPage({ params }) {
  const { userId } = params;
  const projectsList = await getProjectsList(userId);

  return (
    <div className="w-full max-w-full h-screen flex justify-start items-start gap-8 flex-col p-4">
      <ProjectsSection />
      <main className="w-full max-w-full h-full min-h-1/2">
        <ItemsList list={projectsList} sectionName={"projects"} />
      </main>
    </div>
  );
}
async function getProjectsList(userId) {
  try {
    const request = await fetch(`http://localhost:4000/api/${userId}/project`);
    const data = await request.json();
    return data;
  } catch (error) {
    return {
      error: "fetch project lis error",
      message: error.message,
    };
  }
}
export default ProjectsPage;
