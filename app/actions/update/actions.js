"use server";
import credentials from "../../credentials/credentials";
import {
  bioSchema,
  experienceSchema,
  projectSchema,
  skillsSchema,
  layoutsSchema,
} from "../../../lib/schema";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function updateExperience(formData, id) {
  const { user, isLogged } = await credentials();

  try {
    if (isLogged) {
      const updatedExperienceInfo = {
        cName: formData.get("cName"),
        cLogo: formData.get("cLogo"),
        position: formData.get("position"),
        role: formData.get("role"),
        start: formData.get("start"),
        end: formData.get("end"),
        location: formData.get("location"),
      };
      const validPayload = experienceSchema.safeParse(updatedExperienceInfo);

      if (!validPayload.success) {
        throw new Error("not valid data payload");
      }
      const request = await fetch(
        `http://localhost:4000/api/${user.id}/experiences/${id}`,
        {
          method: "PUT",
          body: formData,
        }
      );
      if (!request.ok) {
        throw new Error("network connection failed");
      }
      revalidatePath("/experiences");
      return {
        success: true,
        message: "added success",
      };
    } else {
      redirect("api/auth/login");
    }
  } catch (error) {
    return {
      success: false,
      error: "connection error can't add experience",
      message: error.message,
    };
  }
}
// export async function updateProject(id) {}
export async function updateSkill(id) {
  const { user, isLogged } = await credentials();

  try {
    if (isLogged) {
      const updatedSkill = {
        skillName: fromData.get("skillName"),
        skillLogo: fromData.get("skillLogo"),
      };
      const validPayload = skillsSchema.safeParse(updatedSkill);

      if (!validPayload.success) {
        return validPayload.error.flatten().fieldErrors;
      }
      const response = await fetch(
        `http://localhost:4000/api/${user?.id}/skills/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(validPayload.data),
        }
      );
      console.log("skill updated  done");
      response.json().then((res) => {
        console.log(res);
      });
      return;
    } else {
      redirect("api/auth/login");
    }
  } catch (error) {
    return {
      error: "connection error can't add experience",
      message: error.message,
    };
  }
}

export const updateLayoutsAction = async (layouts) => {
  const { user } = await credentials();
  const validLayouts = layoutsSchema.safeParse(layouts);
  if (!validLayouts.success) {
    const errors = {
      error: "not valid data",
      message: {
        expLayout: validLayouts.error.flatten().fieldErrors.expLayout,
        projectsLayout: validLayouts.error.flatten().fieldErrors.projectsLayout,
        skillsLayout: validLayouts.error.flatten().fieldErrors.skillsLayout,
      },
    };
    return errors;
  }
  try {
    const request = await fetch(
      `http://localhost:4000/api/${layouts?.usersId}/layouts/${layouts?.id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...validLayouts?.data }),
      }
    );

    const data = request.json();
    if (request.ok) {
      response.then((res) => {
        console.log(res);
      });
      revalidatePath(`/${user.id}`);
      return data;
    }
  } catch (error) {
    return {
      error: "connection error",
      message: error.message,
    };
  }
};
