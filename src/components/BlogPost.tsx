import { Container, Row, Col } from "react-bootstrap";

import "react-awesome-slider/dist/styles.css";
import heatgun from "../../posts/post1/media/4_IMG_2626.webp";

function formatDate(date: Date): string {
  const options: Intl.DateTimeFormatOptions = {
    weekday: "long",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  };

  //   {content: ""
  //   imgs: []
  // }
  const formattedDate = date.toLocaleString("en-US", options).split(",");

  // Formatting hours and minutes
  return formattedDate.splice(0, 2).join(", ") + " · " + formattedDate.at(-1);
}

interface BlogPostProps {
  title: string;
  subtitle?: string;
  date: Date;
  postNo?: number;
  demo?: string;
}
function BlogPost({ title, subtitle, date, demo }: BlogPostProps) {
  return (
    <Container style={{ marginBottom: "3em" }}>
      <Row>
        <Col md={3}></Col>
        <Col md={6}>
          <Row className="title-row">
            <Col>
              <div className="h3 post-title">{title}</div>
            </Col>
          </Row>
          <Row className="subtitle-row">
            <Col>
              <div className="subtitle">{subtitle}</div>
            </Col>
            <Col>
              <div className="post-date">
                <div className="date">{formatDate(date)}</div>
              </div>
            </Col>
          </Row>
        </Col>
        <Col md={3}></Col>
      </Row>
      <br />
      <Row>
        <Col md={3}></Col>
        <Col md={6} className="content">
          <iframe
            className="d-flex mx-auto fluid"
            style={{ marginBottom: "40px" }}
            width="560"
            height="315"
            src={demo}
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          ></iframe>
          <div className="h4">Artistic Vision</div>
          <p>
            HeartBoids is the marriage (lol!) between generative, Valentine’s
            themed art and my fascination with life-mimicking algorithms. The
            program animates 30ish pixelated hearts around the screen using
            Craig Reynold’s Boid flocking behavior, which is designed to mimic
            birds. Each frame, the algorithm applies a weighted combination of
            three kinds of forces to each Boid depending on where other Boids
            are around it:{" "}
          </p>
          <ul>
            <li>Separation: to prevent a Boid from crowding its flockmates,</li>
            <li>
              Alignment: to keep the Boid heading in the same direction as the
              average of its flock, and
            </li>{" "}
            <li>
              Cohesion: to keep Boids from straying too far from the flock
            </li>
          </ul>
          <p>
            Changing the relative weights of these forces greatly affects the
            behavior of the system at large. For example, if the cohesive force
            is too strong, each flock of Boids converges on a single position.
            Within each flock the Boids vibrate around their centroid and the
            whole flock’s average velocity hits 0. If the alignment force is too
            strong, the Boids will look like they are being mind controlled
            within their flock, changing direction on a dime. If the separation
            force is too strong, the flock ceases to exist at all, and the
            system becomes a bunch of bumbling individuals. I wanted to
            implement this algorithm because I think it’s cool, but I think
            portraying hearts as Boids makes artistic sense as well. Humans may
            not be governed by literal vectors, but we consider things like
            separation, alignment, and cohesion when we interact with others in
            our “flocks.” The parameters I settled on in HeartBoids were
            intended to produce a system that approximates my social experience
            of being 20 in New York. Flocks form and disperse quickly thanks to
            the relatively high separation and cohesive force. Positional and
            social relationships are transient, but the unpredictability is what
            makes the system exciting.
          </p>
          <br></br>
          <div className="h4">Technical Implementation</div>
          <p>
            At the core of my implementation is the Boid struct, which contains
            all the relevant information about a particular Boid:
          </p>
          <pre>
            <code>
              {`
      struct Boid {
        
        pair<float, float> pos;
        pair<float, float> vel;
        pair<float, float> acc;

        TFT_eSprite *boidSpr;

        Boid() {
          boidSpr = new TFT_eSprite(&tft);
        }

        ~Boid() {
          delete boidSpr;
        }
      };
      `}
            </code>
          </pre>
          <p>
            I determined the motion of each Boid by using Reynold's steering
            formula, which says that
          </p>
          <div className="d-flex justify-content-center">
            steering force = desired velocity - current velocity
          </div>
          <br></br>
          <p>
            Here, the desired velocity of a Boid reacting to a force depends on
            which behavior -- seperation, alignment, or cohesion -- has created
            the force. There's a lot to say about the nitty-gritty of how I
            generated those forces, but my implementation essentially follows
            {` `}
            <a href="https://natureofcode.com/autonomous-agents/">this book</a>,
            which explains it better than I probably ever could.
          </p>
          <div className="h5">Reshuffling Flocks</div>
          <p>
            I didn't want random Boids constantly being created and allocated,
            so once a Boid goes fully offscreen, it wraps around to the opposite
            edge like PacMan. Because the function that calculates the distance
            between two Boids can only see within the bounds of the screen, this
            means that the easiest way for an individual Boid to escape its
            flock is to go offscreen. Theoretically this is a bug, but to me
            it's a feature, forcing flocks to repeatedly reshuffle.
          </p>
          <br></br>
          <div className="h4">The Installation</div>
          <p>
            All of the ESP32s were put in custom laser-cut envelopes and hung
            from the airvents on the 5th floor of Milstein. Because the ESP32s
            don't have attached batteries, part of the installation process was
            installing a battery.
          </p>
          <Row>
            <Col md={6}>
              <img
                className="rounded img-fluid"
                src={
                  process.env.PUBLIC_URL + "/posts/post1/media/4_IMG_2626.webp"
                }
                alt="heating the heatshrink"
              ></img>
              <div className="caption">
                Preventing red & black wires from touching using heatshrink. If
                they touch while the battery is connected, the installation
                explodes!
              </div>
            </Col>
            <Col md={6}>
              <img
                className="rounded img-fluid"
                src={
                  process.env.PUBLIC_URL + "/posts/post1/media/11_IMG_2633.webp"
                }
                alt="Battery once connected. "
              ></img>
              <div className="caption">
                Battery once connected. (This is not HeartBoids - I forgot to
                take a picture of this stage)
              </div>
            </Col>
          </Row>
          <Row>
            <Col md={12}>
              {/* public/posts/post1/media/19_IMG_2642.webp */}
              <img
                className="rounded img-fluid"
                src={
                  process.env.PUBLIC_URL + "/posts/post1/media/19_IMG_2642.png"
                }
                alt="HeartBoids in its envelope."
              ></img>
              <div className="caption">
                Ready to hang up. Note the dimmed screen, which was necessary
                due to battery capacity -- the installation had to be up for 5
                hours.
              </div>
            </Col>
          </Row>
          <p>And now, HeartBoids in its flock:</p>
          <iframe
            className="d-flex mx-auto"
            width="560"
            height="315"
            src="https://www.youtube.com/embed/yLaZCF0YMJ8?si=J7LmRgSNmhU-N6J6"
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          ></iframe>
        </Col>
        <Col md={3}></Col>
      </Row>

      <Row className="footer">
        <Col md={12} className="justify-content-right">
          Check out{" "}
          <a href="https://github.com/avahajr/heartboids">the repo!</a>
        </Col>
      </Row>
    </Container>
  );
}

export default BlogPost;
