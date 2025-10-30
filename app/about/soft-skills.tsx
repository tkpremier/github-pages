import { Layout } from '../../app/layout';
import { Drawer } from '../../components/Drawer';

export default function SoftSkills() {
  return (
    <Layout title="About Thomas Kim | Soft Skills | TK Premier">
      <h1 className="title">Soft Skills</h1>
      <p className="description">Why Me? Why you? What can I do for your company?</p>
      <h3>Soft Skills</h3>
      <ul className="root" style={{ maxWidth: '100%' }}>
        <Drawer closed header="STAR answer format" key="star-answer-format">
          <ul>
            <li>
              <strong>Situation</strong> - The interviewer wants you to present a recent challenge and situation which
              you found yourself in
            </li>
            <li>
              <strong>Task</strong> - What were you required to achieve? The interviewer will be looking to see what you
              were trying to achieve from the situation. Some performance development methods use &ldquo;Target&rdquo;
              rather than &ldquo;Task&rdquo;. Job interview candidates who describe a &quot;Target&quot; they set
              themselves instead of an externally imposed &ldquo;Task&rdquo; emphasize their own intrinsic motivation to
              perform and to develop their performance
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
        <Drawer header="Tell me about yourself" key="about-me">
          <ul>
            <li>Started Web Dev in 2013, after years as research assistant for Johns Hopkins University.</li>
            <li>A &quot;self-taught&quot; dev who had the pleasure to work with great colleagues</li>
            <li>Developed iPad apps using PhoneGap, HTML, CSS, and JS</li>
            <li>
              Began at Phillips as a contractor to develop a payment platform for a special &quot;online-only&quot;
              sale. This consisted of using BackboneJS, Authorize.Net, and StripeAPI later on.
            </li>
            <li>
              After successful launch, I had to justify the company keeping me on, even though I was the only FE dev, so
              I took the initiative to implement responsive design for Phillips to improve its mobile presence. I used
              layout stylesheets from Bootstrap to accomodate our page, making layout decisions based on existing
              layout.
            </li>
            <li>
              Migrated project from Backbone to React to leverage reusable components for the website and respective cms
            </li>
            <li>
              Currently creating personal website to enhance brand and marketability to employers. &nbsp;Using new Tech
              stack includes TypeScript, PostgresSQL, Docker, Cloud deployment, NextJS, NodeJS
            </li>
          </ul>
        </Drawer>
        <Drawer header="Why do you want to work for us? OR Why did you leave?" key="why-us">
          <ul>
            <li>
              I am looking to join a more established organization that allows for more internal growth and the
              opportunity to work with newer technologies.{' '}
              <em>And what better way to do that than join a Fortune 25</em> company.
            </li>
            {/* <li>I also want to broaden my career horizon, just in general.</li> */}
            <li>
              I look forward to working where there&apos;s more opportunity for me to showcase my talents at a major
              company
            </li>
            <li>
              More importantly, I will be also working with different peers that have their own <strong>diverse</strong>{' '}
              input and expertise in the e-commerce dev <strong>perspective</strong>.
            </li>
            <li>
              At my previous employer I worked with a small development team and gained great experience on a global
              scope. I learned a lot from the experience, on project management, product development cycles, and code
              maintenance.
              <br />
              <ul>
                <li>
                  Code-wise, as I was lead, I really loved the fact that I got to write code, AND refactor that code for
                  a better product.
                </li>
                <li>I&apos;m passionate about problem solving and researching software design patterns.</li>
                <li>
                  Unfortunately, as the years went on, I felt I have grown out of the position at my last employer, and
                  am looking for more challenges with a bigger and diverse team.
                </li>
                <li>
                  I want to work for a company that shows strong appreciation and support for their tech team. Having
                  led a small FE tech team, there have been times where resources have stretched thin between
                  maintenance tasks, feature development, and last-minute project requests.
                </li>
              </ul>
            </li>
            <li>
              I want to work at place where I can continue develop my eCommerce industry development. I was privileged
              to gain so much experience working for a global company and their web exposure, and now I want to broaden
              my skillset by working with more brilliant minds at <em>Insert Company Here</em>, offering my expertise,
              while also taking in all the great knowledge your team has collected over the years.
            </li>
            <li>
              <em>Iron sharpens Iron</em>, as they say.{' '}
            </li>
          </ul>
        </Drawer>
        <Drawer header="Why should we hire you?" key="why-hire">
          <ul>
            <li>
              <strong>Leadership</strong>:<br />
              <ul>
                <li>Learned to listen and empathize with different viewpoints.</li>
              </ul>
            </li>
            <li>
              <strong>Values</strong>:<br />
              <ul>
                <li>
                  Strive to uphold accessibility, data security, and user experience standards that{' '}
                  <em>Insert Company Here</em> holds as a company.
                </li>
              </ul>
            </li>
            <li>
              <strong>Experience</strong>:<br />
              <ul>
                <li>
                  eCommerce <strong>CLIENT FACING</strong> expertise
                </li>
                <li>
                  <strong>Commercial, Global, Enterprise</strong> experience in developing React/Redux web applications.
                </li>
                <li>Many years of researching bugs.</li>
                <li>I can offer an experienced POV.</li>
              </ul>
            </li>
            <li>
              <strong>Passion</strong>:<br />
              <ul>
                <li>Love code discovery, reading code, and improving code.</li>
                <li>
                  What I enjoy so much about refactoring is that{' '}
                  <em>while the goal has already been accomplished, within reason</em>, the journey is to be re-written
                  for business, performance, or security reasons.
                </li>
              </ul>
            </li>
          </ul>
        </Drawer>
        <Drawer header="What are you looking for in your next role?" key="next-role">
          <p>
            For my next role, I&rsquo;m looking to round out my software dev knowledge by learning more about API
            dev/design, Simple Database Setup, and cloud deployment using Docker and Kubernetes.{' '}
            <em>Speak about the website setup</em>
          </p>
        </Drawer>
        <Drawer header="What have you done to positively contribute to a company or product?" key="positive-impact">
          <ul>
            <li>
              <strong>Initiating, prototyping, and implementing responsive build for phillips.com</strong>. Why?
              <br />
              <ul>
                <li>
                  <strong>Validation of initiating and deploying a product cycle</strong>
                </li>
                <li>Showed initiative to understand the need for one at the time.</li>
                <li>Developing a prototype to show proof-of-concept in feasibility.</li>
                <li>Implemented a column layout system to allow for ease of future development</li>
                <li>Delivered on business goal for deploying before most important sale of season.</li>
                <li>Able to follow thru product lifecycle End to end</li>
              </ul>
            </li>
            <li>Migration from BackboneJS to ReactJS</li>
          </ul>
        </Drawer>
        <Drawer
          header="Can you share an example of an idea you believed in and had to push hard to convince others to support/adopt?"
          key="adopt-idea"
        >
          <ul>
            <Drawer key="adopt-idea-situation" header="Situation">
              Before we started to work on the redesign project, the UX team showed us an extensive Figma prototype of
              proposed changes to the <em>Sale</em> and <em>Lot</em> page. They were excited about rolling about these
              updates before a certain sale was to go live, which was about 6 months. They decided they wanted to roll
              out various updates all at once, ideally 4-6 weeks before sale day.
            </Drawer>
            <Drawer header="Task/Target" key="adopt-idea-task">
              After the prototype demo, the task at hand was to roll out the two most important pages on our website
              during sale season. The prototype had various &ldquo;skin-job&rdquo; implementation of existing
              components, coupled with minor data updates.
            </Drawer>
            <Drawer header="Action" key="adopt-idea-action">
              <ul>
                <li>Break down figma prototype and create epics and sprint features to update on a module basis.</li>
                <li>
                  Discuss with Experience team and Business Analyst to understand new data points and where they would
                  be coming from (which other internal app?), new component transitions, QA, UAT, and deployment
                  milestones.
                </li>
                <li>
                  Upon hearing these discussions, I promoted an interative dev and deployment approach for the two
                  pages. This will allow us to focus on the individual components and test its implementation for not
                  just the two updated pages, but also other pages, like homepage. I also proposed component milestones
                  and page layout milestones to divide the work within the team.
                </li>
              </ul>
            </Drawer>
            <Drawer header="Result" key="adopt-idea-result">
              The Experience team initially were open to iterative deployment. However, after another discussion that I
              was not part of, the final decision was to revert to waterfall approach. The UX team felt that since the
              redesign wasn&apos;t a feature that had a hard deadline, the UX team felt more comfortable rolling out
              these updates all at once to mimic a Grand &quot;ReOpening&quot;. <strong>Result</strong>: It&apos;s still
              not up.
            </Drawer>
          </ul>
        </Drawer>
        <Drawer header="Tell me about a situation when you handled conflict with a coworker?" key="conflict-coworker">
          <ul>
            <Drawer header="Situation" key="star-situation">
              <ul>
                <li>My last project at Phillips, I was leading our redesign project</li>
                <li>
                  our developer was finding inconsistencies with her dev build and Figma design files after initial
                  design-freeze.
                </li>
                <li>These inconsistencies would also be brought up during status meetings.</li>
                <li>
                  It turns out that the designer was still making minor tweaks after the initial designs have been
                  submitted to begin development.
                </li>
              </ul>
            </Drawer>
            <Drawer header="Task" key="star-task">
              <ul>
                <li>
                  As the FE lead, I had to minimize scope creep on a major project for a Developer, as they may not
                  notice subtle differences in Figma due to scope of project while empathizing with designer&rsquo;s
                  potential request to change on Figma.
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
                <li>
                  Spoke to designer to ask why he was making these changes after design freeze. He said that he wanted
                  to adhere to best practices and standards, and found that there were inconsistencies in design for the
                  same components in different pages. He also told us that as he was doing more research, he found that
                  he had to update some of the user journeys.
                </li>
                <li>
                  I explained to him that these updates weren&apos;t being noticed by the developer and she felt
                  overwhelmed by the updates as she&apos;s finding updates to components she thought she had completed.
                </li>
                <li>
                  He agreed to better document his changes and let us know when such changes are mad. He will also
                  respect the design freeze and discuss with us if there&apos;s a design update that he felt passionate
                  about implementing.
                </li>
                <li>
                  We, the developer team, agreed to scope out his changes and come back with a decision to whether delay
                  the update to phase two, or agree to the updates as long as stakeholders were aware that this would
                  further push out the project.
                </li>
              </ul>
            </Drawer>
            <Drawer header="Result" key="star-result">
              <ul>
                <li>
                  The devteam were notified when more minor updates came, and we were able to discuss openly about how
                  to implement the changes, whether they&apos;ll go in with the initial launch or it will be part of
                  Phase 2.
                </li>
              </ul>
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
              what&rsquo;s best for the client. In addition, I recognized that given the client was in such a dire
              situation, they may react negatively to longer-term strategy recommendations given without strong actions
              in the next 2 quarters, the client may not need the longer-term strategy work (e.g., if they were sold to
              a strategic buyer). However, I also saw where my co-worker was coming from, and realized that my
              recommendation may not have explicitly addressed that any actions done should hopefully bring the client
              closer towards achieving their long-term vision.
            </li>
            <li>
              <strong>Action</strong>: After reflecting on the situation, I went to talk with my co-worker around the
              areas of focus for the client. As such, when talking with the co-worker, I first admitted what I may have
              overlooked. Then, I discussed why I felt it was more important to focus on the near-term actions, bringing
              in specific quotes the client previously said as support. Throughout the discussion, I continued to use
              how our work could enable the client&rsquo;s success as the “guidepost,” as I knew the co-worker and I had
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
