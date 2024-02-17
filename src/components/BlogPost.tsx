import { useState, useEffect } from "react";
import AwesomeSlider from "react-awesome-slider";
import { Container, Row, Col } from "react-bootstrap";
// import AwesomeSlider from "react-awesome-slider";
import withAutoplay from "react-awesome-slider/dist/autoplay";
import "react-awesome-slider/dist/styles.css";

const AutoplaySlider = withAutoplay(AwesomeSlider);

function formatDate(date: Date): string {
  const options: Intl.DateTimeFormatOptions = {
    weekday: "short",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  };
  const formattedDate = date.toLocaleString("en-US", options).split(",");
  console.log(formattedDate);

  // Formatting hours and minutes
  return formattedDate.splice(0, 2).join(", ") + " · " + formattedDate.at(-1);
}

interface BlogPostProps {
  title: string;
  subtitle?: string;
  date: Date;
  postNo: number;
}
function BlogPost({ title, subtitle, date, postNo }: BlogPostProps) {
  const [images, setImages] = useState<string[]>([]);

  useEffect(() => {
    // Dynamically import the images.json file for the specific post
    import(`../posts/post${postNo}/images.json`)
      .then((module) => {
        console.log(module.default);
        setImages(module.default);
      })
      .catch((error) => {
        console.error(`Error importing images for post ${postNo}:`, error);
      });
  }, [postNo]);

  return (
    <Container>
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
          <Row className="timestamp-row"></Row>
        </Col>
        <Col md={3}></Col>
      </Row>
      <Row className="gallery">
        <Col md={3}></Col>
        <Col md={6}>
          <AutoplaySlider
            play={true}
            cancelOnInteraction={false}
            interval={6000}
          >
            {images.map((image, index) => (
              <div key={index} data-src={image} />
            ))}
          </AutoplaySlider>
        </Col>
        <Col md={3}></Col>
      </Row>
      <Row className="post"></Row>
    </Container>
  );
}

export default BlogPost;
