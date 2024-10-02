"use client";
import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import { LuCopy } from "react-icons/lu";
import { LuCheckCheck } from "react-icons/lu";
import TestimonialsCard from "../../../components/ui/cards/TestimonialsCard";
function Testimonials() {
  const url = "";
  const { userId } = useParams();
  const [copyState, setCopy] = useState(false);
  const [urlLink, setUrlLink] = useState("");
  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(urlLink);
    setCopy(true);
    setTimeout(() => {
      setCopy(false);
    }, 1000);
  };

  const [feedbackList, setFeedbackList] = useState([]);

  useEffect(() => {
    async function getTestimonialsList(userId) {
      try {
        const request = await fetch(
          `http://localhost:4000/api/${userId}/feedback`
        );
        if (!request.ok) {
          throw new Error("connection error ");
        }
        const data = await request.json();
        setFeedbackList(data);
        return data;
      } catch (error) {
        console.log(error.message);
      }
    }
    getTestimonialsList(userId);
  }, []);
  return (
    <section
      className={
        "w-full m-auto p-4 flex flex-col justify-center  items-center gap-8"
      }
    >
      <div className={"flex flex-col justify-center items-center gap-4"}>
        <h1>Testimonials</h1>
        {!urlLink && (
          <button
            onClick={() =>
              setUrlLink(`${window.location.origin}/${userId}/feedback`)
            }
            className={"px-4 py-2 rounded-md bg-card border max-w-44"}
          >
            Generate Link
          </button>
        )}
        {urlLink && (
          <div
            className={
              "flex justify-center items-center p-4 border rounded-md gap-8 bg-card"
            }
          >
            <p>{urlLink}</p>
            {copyState ? (
              <span className="hover:bg-secondary  p-2 rounded-md bg-card text-primary duration-150 cursor-pointer">
                <LuCheckCheck size={20} />
              </span>
            ) : (
              <span
                onClick={copyToClipboard}
                className="hover:bg-secondary p-2 rounded-md bg-card  text-primary duration-150 cursor-pointer"
              >
                <LuCopy size={20} />
              </span>
            )}
          </div>
        )}
      </div>
      <div className="grid grid-cols-3 grid-flow-row gap-4 max-md:grid-cols-2 max-sm:grid-cols-1">
        {!!feedbackList.length ? (
          feedbackList.map((feedback) => {
            return (
              <TestimonialsCard
                id={feedback.id}
                key={feedback.id}
                profile={feedback.profile}
                name={feedback.name}
                video={feedback.video}
                position={feedback.position}
                feedback={feedback.feedback}
              />
            );
          })
        ) : (
          <div className="text-center m-auto">
            <span>there is no feedback yet</span>
            <span>share your link to your customers to rank up.</span>
          </div>
        )}
      </div>
    </section>
  );
}

export default Testimonials;
