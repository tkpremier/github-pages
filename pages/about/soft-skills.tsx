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
        <Drawer header="Why do you want to work for us?" key="why-us">
          <ul>
            <li>
              I want to work for a company that shows strong appreciation and support for their tech team. Having led a
              small FE tech team,
            </li>
            <li>
              I also want my next opportunity to be with a team that has multiple diverse viewpoints to bounce ideas off
              each other.
            </li>
            <li>
              I want to work at place where I can develop my eCommerce industry development. I feel phillips.com was a
              starting point, for what my responsibilities entailed. This small fine art auction house allowed me to
              shine on a global scale as an e-commerce platform.
            </li>
            <li>Iron sharpens Iron, as they say. </li>
          </ul>
        </Drawer>
        <Drawer header="What are you looking for in your next role?" key="next-role">
          <p>
            For my next role, I'm looking to round out my software dev knowledge by learning more about API dev/design,
            Simple Database Setup, and cloud deployment using Docker and Kubernetes.{' '}
            <em>Speak about the website setup</em>
          </p>
        </Drawer>
        <Drawer closed header="STAR answer format" key="star-answer-format">
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
        <Drawer
          closed
          header="Tell me about a situation when you handled conflict with a coworker? EXAMPLE"
          key="conflict-coworker-example-1"
        >
          <ul>
            <Drawer header="Situation​" key="star-situation">
              <p>
                My last project at Phillips, I was leading our redesign project when our developer was finding
                inconsistencies with her dev build and Figma updates after initial designs have been complete. It turns
                out that the designer was still making minor tweaks after the initial designs have been submitted to
                development.
              </p>
            </Drawer>
            <Drawer header="Task" key="star-task">
              <ul>
                <li>
                  "As the FE lead, I had to minimize scope creep on a major project for a Developer, as they may not
                  notice subtle differences in Figma due to scope of project while empathizing with designer's potential
                  request to change on Figma. "
                </li>
                <li>Explain to designer why minor updates increases deadlines</li>
                <li>
                  Explain to developer that these minor updates may happen, and we should acknowledge how to account for
                  them within our workflow.
                </li>
              </ul>
            </Drawer>
            <Drawer header="Action" key="star-action">
              <ul>
                <li></li>
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
              </ul>
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
        <Drawer
          header="Tell me about a situation when you handled conflict with a coworker? EXAMPLE"
          key="conflict-coworker-example-2"
        >
          <ul>
            <li>
              <strong>Situation</strong>:&nbsp;Prior to my MBA, I worked as a consultant at Deloitte. During that time,
              I experienced conflict with one of my co-consultants when we were staffed on a rapid turnaround study for
              a struggling retail player. Specifically, we disagreed with the course of action the retailer should take.
              While I thought the retailer should have prioritized action items that would boost its profitability in
              the next 1-2 quarters, the other consultant thought the retailer should focus on actions that would set it
              up for long-term success.
            </li>
            <li>
              <strong>Tasks</strong>:&nbsp;At the end of the day, I knew that the other consultant and I both wanted
              what’s best for the client. In addition, I recognized that given the client was in such a dire situation,
              they may react negatively to longer-term strategy recommendations given without strong actions in the next
              2 quarters, the client may not need the longer-term strategy work (e.g., if they were sold to a strategic
              buyer). However, I also saw where my co-worker was coming from, and realized that my recommendation may
              not have explicitly addressed that any actions done should hopefully bring the client closer towards
              achieving their long-term vision.
            </li>
            <li>
              <strong>Action</strong>: After reflecting on the situation, I went to talk with my co-worker around the
              areas of focus for the client. As such, when talking with the co-worker, I first admitted what I may have
              overlooked. Then, I discussed why I felt it was more important to focus on the near-term actions, bringing
              in specific quotes the client previously said as support. Throughout the discussion, I continued to use
              how our work could enable the client’s success as the “guidepost,” as I knew the co-worker and I had
              similar objectives.
            </li>
            <li>
              <strong>Results</strong>: We focused our work on near-term objectives the client should take and called
              out that the near-term objectives should ensure the near-term work set them up for its long-term
              ambitions. The client was very happy, and once it got its bearing, re-engaged Deloitte for longer-term
              strategy work.
            </li>
          </ul>
        </Drawer>
      </ul>
    </Layout>
  );
}
