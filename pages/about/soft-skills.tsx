import React from 'react';
import Drawer from '../../components/Drawer';
import Layout from '../../components/layout';

export default function SoftSkills() {
  return (
    <Layout title="About Thomas Kim">
      <h1 className="title">Soft Skills</h1>
      <p className="description">Why Me? Why you? What can I do for your company?</p>
      <h3>Soft Skills</h3>
      <ul className="root" style={{ maxWidth: '100%' }}>
        <Drawer header="STAR answer format" key="star-answer-format">
          <ul>
            <li>
              <strong>Situation</strong> - The interviewer wants you to present a recent challenge and situation which
              you found yourself in
            </li>
            <li>
              <strong>Task</strong> - What were you required to achieve? The interviewer will be looking to see what you
              were trying to achieve from the situation. Some performance development methods use "Target" rather than
              "Task". Job interview candidates who describe a "Target" they set themselves instead of an externally
              imposed "Task" emphasize their own intrinsic motivation to perform and to develop their performance
            </li>
            <li>
              <strong>Action</strong> - What did you do? The interviewer will be looking for information on what you
              did, why you did it, and what the alternatives were
            </li>
            <li>
              <strong>Results</strong> - What was the outcome of your actions? What did you achieve through your actions
              and what did you learn? What steps did you take to improve after the experience?
            </li>
          </ul>
        </Drawer>
        <Drawer header="STAR example" key="star-example">
          <ul>
            <Drawer header="Situation​" key="star-situation">
              <p>
                "I was the team lead of a school project about building a social network mobile web app. Our designer's
                midterms were approaching and didn't have time to produce the mockups. Our front-end person was rushing
                him for the mockups so that he could proceed with his work, and that was stressing the designer out. The
                atmosphere in the team was tense."
              </p>
            </Drawer>
            <Drawer header="Task" key="star-task">
              <p>
                "As the team lead, I had to resolve the tension between the front-end developer and the designer so that
                the team could work together peacefully and complete the project on time."
              </p>
            </Drawer>
            <Drawer header="Action" key="star-action">
              <p>
                "I spoke to the front-end developer to ask him why he was rushing the designer for the designs. He said
                that he wanted the designs early because it would be a waste of time rebuilding if the designer designed
                something different eventually. I explained to him that the midterm dates were out of the designer's
                control and we had to be more understanding about each other's schedules. I spoke to the designer to get
                a rough idea of what he had in mind and asked him when he could commit to producing the high-fidelity
                designs. He replied that he could start on them as soon as his midterms were over. I explained to him
                why the front-end developer was pushing him for the mockups, and that the front-end developer had no ill
                intentions and simply wanted the project to succeed. As someone with some experience in UI/UX design, I
                came up with wireframe mocks, ran them by the designer for approval, then passed them to the front-end
                developer to start building. I encouraged the front-end developer to use placeholders and not be too
                concerned about the details for now. We could build the non-UI parts first (authentication, hook up with
                APIs) and tweak pixels and add polish later on. The front-end developer agreed and went ahead with the
                approach. I explained to the front-end developer that the designer will pass us the mockups after his
                midterm, by date."
              </p>
            </Drawer>
            <Drawer header="Result" key="star-result">
              <p>
                "When our designer ended midterms, he came back with beautiful mockups that fit well into the
                wireframes. Our front-end developer implemented them with great care to detail. We ended up scoring top
                marks for the project and became a great team."
              </p>
            </Drawer>
          </ul>
        </Drawer>
      </ul>
    </Layout>
  );
}
