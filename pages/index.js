import React from "react";
import "bootstrap/dist/css/bootstrap.css";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { Hint } from "./Hint";
import { useState } from "react";
import { client } from "@gradio/client";
// import Replicate from "replicate";
// const REPLICATE_API_TOKEN = "r8_58jOh92HZJ7qXdqVIhIMeoGZRh4BDkM4bKyl1";

export default function App() {
  var [formData, setFormData] = useState({
    Q1: "i dont know",
    Q2: "i dont know",
    Q3: "i dont know",
    Q4: "i dont know",
    Q5: "i dont know",
    Q6: "i dont know",
    Q7: "i dont know",
    Q8: "i dont know"
  });

  // const replicate = new Replicate({
  //   auth: REPLICATE_API_TOKEN
  // });

  const [Q, setQ] = useState([]);

  const [Anno, setAnno] = useState({
    An0: "",
    An1: "",
    An2: "",
    An3: "",
    An4: "",
    An5: "",
    An6: "",
    An7: ""
  });
  function handleChange(e) {
    const key = e.target.name;
    const value = e.target.value;
    if (value === "") setFormData({ ...formData, [key]: "i dont know" });
    else setFormData({ ...formData, [key]: value });
  }
  var mesg;
  function Submit() {
    setQ((Q) => []);
    setAnno({
      An0: "",
      An1: "",
      An2: "",
      An3: "",
      An4: "",
      An5: "",
      An6: "",
      An7: ""
    });
    const message = `
    If you have the following questions:

    Q1- What is the name of the university where Mohammad Alakhras studies?
    Q2- How many years of study are there in the Faculty of Information Engineering at Al-Baath University?
    Q3- What is the name of the city where Mohammad Alakhras lives?
    Q4- How many courses are there in the second year of the Faculty of Information Engineering at Al-Baath University?
    Q5- What are the departments available in the Faculty of Information Engineering at Al-Baath University?
    Q6- What is the maximum grade given for practical courses?
    Q7- How many English language courses are taught in the Faculty of Information Engineering at Al-Baath University (excluding ESP specialized language courses)?
    Q8- In which year does the specialization study begin in the Faculty of Information Engineering at Al-Baath University? (i.e when does the student start specializing in Software Engineering or Network Engineering?)
    
    And the correct answers of previous questions are:


    ANS1- Mohammad Al-Akhras studies at Albaath University (جامعة البعث في اللغة العربية).
    ANS2- 5 years only.
    ANS3- Hama,Syria.
    ANS4- 12 courses.
    ANS5- 2 departments are : Software Engineering and Network Engineering only.
    ANS6- Max Grade is 30 marks.
    ANS7- 4 courses.
    ANS8- in 4th academic year the specialization study begin (اي السنة الرابعة).


    ------------------------------


    Now, the user input his answers follows:

    ANS1- ${formData.Q1}.
    ANS2- ${formData.Q2}.
    ANS3- ${formData.Q3}.
    ANS4- ${formData.Q4}.
    ANS5- ${formData.Q5}.
    ANS6- ${formData.Q6}.
    ANS7- ${formData.Q7}.
    ANS8- ${formData.Q8}.

    ___________________________
    now check if the user answers are correct (user can enter in Arabic or English).
    and you must know that all 'null' answers make result is False
    
    Note : Your reply format must be in this format without additional words:
    Q1-[TRUE | FALSE] [,] [ write "Correct Answer" if the user answer is correct | the correction if the user answer is incorrect]'$'.
    Q2-[TRUE | FALSE] [,] [ write "Correct Answer" if the user answer is correct | the correction if the user answer is incorrect]'$'.
    Q3-[TRUE | FALSE] [,] [ write "Correct Answer" if the user answer is correct | the correction if the user answer is incorrect]'$'.
    Q4-[TRUE | FALSE] [,] [ write "Correct Answer" if the user answer is correct | the correction if the user answer is incorrect]'$'.
    Q5-[TRUE | FALSE] [,] [ write "Correct Answer" if the user answer is correct | the correction if the user answer is incorrect]'$'.
    Q6-[TRUE | FALSE] [,] [ write "Correct Answer" if the user answer is correct | the correction if the user answer is incorrect]'$'.
    Q7-[TRUE | FALSE] [,] [ write "Correct Answer" if the user answer is correct | the correction if the user answer is incorrect]'$'.
    Q8-[TRUE | FALSE] [,] [ write "Correct Answer" if the user answer is correct | the correction if the user answer is incorrect]'$'.
    '$' must be at the end of each row such as format.
    and dont forget to transalte arabic answers becasue user can answer in Arabic languae
    
    `;

    GetRes(message);

    // setAnno({ ...Anno, An1: "hello" });
    //console.log(formData);
  }

  async function GetRes(par) {
    const app = await client("https://mohammedalakhras-ai-chat.hf.space/");
    const result = await app.predict("/predict", [
      par // string  in 'message' Textbox component
    ]);

    mesg = result.data[0];
    GetTrueorFasle(mesg);

    console.log("ann=", Anno);
    console.log("Q=", Q);
  }

  // async function GetRes(par) {
  //   mesg = await replicate.run(
  //     "meta/llama-2-70b-chat:02e509c789964a7ea8736978a43525956ef40397be9033abf9fd2badfe68c9e3",
  //     {
  //       input: {
  //         prompt: par
  //       }
  //     }
  //   );
  //   console.log("ann=", Anno);
  //   console.log("Q=", Q);
  // }

  function GetTrueorFasle(x) {
    let Rows = x.split("$");
    for (let i = 0; i < Rows.length; i++) {
      if (Rows[i] !== "" && typeof Rows[i] !== "undefined") {
        const r = String(Rows[i]).split("-")[1].split(",")[0].trim();
        if (typeof r !== "undefined") {
          //   setQ((prevQ) => ({ ...prevQ, [`Q$[i + 1]`]: r }));
          setQ((Q) => [...Q, r]);
        }
      }
    }

    // let Rows = x.split("#");
    // console.log(Rows);

    for (let i = 0; i < Rows.length; i++) {
      if (Rows[i] !== "") {
        const a = Rows[i].split("-")[1].split(",").join("");
        if (typeof a !== "undefined") {
          setAnno((prevAnno) => ({ ...prevAnno, [`An${i}`]: a }));
        }
      }
    }
  }

  return (
    <div
      style={{
        display: "block",
        width: "100%",
        padding: "30px",
        margin: "10px"
      }}
    >
      <h4>Automated correction of short-answer questions Using AI</h4>
      <Form>
        <Form.Group>
          <Form.Label>
            What is the name of the university where Mohammad Alakhras studies?
          </Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter University Name"
            onChange={handleChange}
            name="Q1"
          />
          <Hint val={Anno.An0} Correctness={Q[0]} />
        </Form.Group>

        <Form.Group>
          <Form.Label>
            How many years of study are there in the Faculty of Information
            Engineering at Al-Baath University?
          </Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter The Number of Years"
            onChange={handleChange}
            name="Q2"
          />
          <Hint val={Anno.An1} Correctness={Q[1]} />
        </Form.Group>

        <Form.Group>
          <Form.Label>
            What is the name of the city where Mohammad Alakhras lives?
          </Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter city name"
            onChange={handleChange}
            name="Q3"
          />
          <Hint val={Anno.An2} Correctness={Q[2]} />
        </Form.Group>

        <Form.Group>
          <Form.Label>
            How many courses are there in the second year of the Faculty of
            Information Engineering at Al-Baath University?
          </Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter the number of courses"
            onChange={handleChange}
            name="Q4"
          />
          <Hint val={Anno.An3} Correctness={Q[3]} />
        </Form.Group>

        <Form.Group>
          <Form.Label>
            What are the departments available in the Faculty of Information
            Engineering at Al-Baath University?
          </Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter the names of the departments"
            onChange={handleChange}
            name="Q5"
          />
          <Hint val={Anno.An4} Correctness={Q[4]} />
        </Form.Group>

        <Form.Group>
          <Form.Label>
            What is the maximum grade given for practical courses?
          </Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter max grade"
            onChange={handleChange}
            name="Q6"
          />
          <Hint val={Anno.An5} Correctness={Q[5]} />
        </Form.Group>

        <Form.Group>
          <Form.Label>
            How many English language courses are taught in the Faculty of
            Information Engineering at Al-Baath University (without specialized
            language courses (ESP) )?
          </Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter English language courses number"
            onChange={handleChange}
            name="Q7"
          />
          <Hint val={Anno.An6} Correctness={Q[6]} />
        </Form.Group>

        <Form.Group>
          <Form.Label>
            In which year does the specialization study begin in the Faculty of
            Information Engineering at Al-Baath University? (i.e when does the
            student start specializing in Software Engineering or Network
            Engineering?)
          </Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter the academic year number"
            onChange={handleChange}
            name="Q8"
          />
          <Hint val={Anno.An7} Correctness={Q[7]} />
        </Form.Group>

        <Button variant="primary" onClick={Submit}>
          Click here to submit form
        </Button>
      </Form>
    </div>
  );
}
