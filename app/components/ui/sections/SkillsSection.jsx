"use client";
import { useState } from "react";
import SkillsForm from "../profile/forms/SkillsForm";
import SkillCard from "../cards/SkillCard";

function SkillsSection() {
  const [skillState, setSkill] = useState({
    skillName: "skill Name",
    skillLogo: "",
  });
  return (
    <section className="w-full flex justify-start items-center gap-8 max-sm:flex-col-reverse max-sm:justify-center max-md:flex-col-reverse max-md:justify-center">
      <SkillsForm skillState={skillState} setSkill={setSkill} />
      <div className="bg-secondary p-4 border-2 border-dashed rounded-md flex justify-center items-center w-1/2 max-sm:w-full max-md:w-full max-sm:py-8 max-md:py-8 h-full">
        <SkillCard skillName={skillState.skillName} layoutStyle="1" />
      </div>
    </section>
  );
}

export default SkillsSection;
