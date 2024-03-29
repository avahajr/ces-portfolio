import {Col, Container, Row} from "react-bootstrap";
import "react-awesome-slider/dist/styles.css";
import {formatDate} from "./FormatDate";

interface BlogPostProps {
    title: string;
    subtitle?: string;
    date: Date;
    postNo?: number;
    demo?: string;
}

function BlogPost2({title, subtitle, date, demo}: BlogPostProps) {
    return (<Container  id= 'flight-sim' style={{marginBottom: "3em"}}>
        <Row>
            <Col md={3}></Col>
            <Col md={6}>
                <Row className="title-row">
                    <Col>
                        <h1 className="h3 post-title">{title}</h1>
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
        <br/>
        <Row>
            <Col md={3}></Col>
            <Col md={6} className="content">
                <iframe
                    className="d-flex mx-auto fluid"
                    style={{marginBottom: "40px"}}
                    width="560"
                    height="315"
                    src={demo}
                    title="YouTube video player"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                ></iframe>
                <h4 className="h4">Artistic Vision</h4>
                <h5 className='h5'>Sensors</h5>
                <p>
                    For me, the most obvious way to process sensor input is video games. In this
                    project, I let the sensor input restriction inspire me. I started thinking about games
                    that have three axes of control, and instantly thought of airplanes (pitch, yaw and roll).
                </p>
                <br/>
                <img className="d-flex mx-auto img-fluid" src={process.env.PUBLIC_URL + "/posts/post2/pyr.png"}
                     alt="airplane diagram showing pitch, yaw and roll axes"/>
                <div className="text-align-center caption">the axes of plane control.</div>
                <p>
                    After developing the first prototype, I found that what I liked best about this project
                    was that physical controls felt closer to flying a plane than when using keyboard controls.
                    But overall, the simulation felt flat all the way through, even when you were seconds away from
                    crashing.
                </p>

                <h5>LEDs</h5>
                <p>Adding LEDs to indicate the danger of crashing gave the simulation the sense of urgency I was after.
                    The green LED stays on if there is no danger, and yellow turns on for altitudes below 200m. The red
                    LED flashes if there is an imminent danger of crashing based on the proximity of the ground.</p>

                <h5 className='h5'>Enclosure</h5>
                <p>After many rounds of prototyping, I ultimately decided on a combination of clear and blue acrylic for
                    the enclosure. This material looked sharper than cardboard, but more importantly, the blue/clear
                    combination reminded me of the sky!</p>
                <br></br>

                <h4 className="h4">Technical Implementation</h4>
                <h5 className='h5'>Hardware Prototypes</h5>
                <Row>
                    <Col>
                        <img className='img-fluid' src={process.env.PUBLIC_URL + "/posts/post2/no_led.png"}
                             alt={"installation-day prototype. No LED."}/>

                    </Col>
                    <Col>
                        <img className='img-fluid' src={process.env.PUBLIC_URL + "/posts/post2/proto1.png"}
                             alt={"first fully-featured prototype"}/>

                    </Col>
                </Row>
                <Row>
                    <Col>
                        <div className='caption'>
                            Installation-day prototype. In this version, the ESP32 does not receive any signals from the
                            Unity simulation.
                        </div>
                    </Col>
                    <Col>
                        <div className='caption'>
                            First fully-featured prototype, with warning LEDs and screen feedback (not shown).
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <img className='img-fluid' src={process.env.PUBLIC_URL + "/posts/post2/proto_final.png"}
                             alt={'controller surrounded by past enclosure prototypes'}/>
                    </Col>
                </Row>
                <Row>
                    <div className={'caption'}>Combining the final prototype with the acrylic enclosure.</div>
                </Row>

                <h5 className={'h5'}>Code</h5>
                <h6 className={'h6'}>Flight controller</h6>
                <p>The flight controller script in <code>MyListener.cs</code> contains all the information about the
                    plane's motion that the player can control: the current throttle, pitch, yaw, and roll. This
                    controller relies on the Unity physics engine entirely, at the expense of realism. Increasing
                    throttle generates the plane's
                    lift and forward force, while steering inputs apply a proportional torque about the expected axis:
                </p>
                <pre>
                    <code>{`
    _rb.AddForce(transform.right * (maxThrust * _throttle));
    _rb.AddTorque(transform.up * (_yaw * ResponseModifier));
    _rb.AddTorque(-transform.right * (_roll * ResponseModifier));
    _rb.AddTorque(transform.forward * (_pitch * ResponseModifier));
    _rb.AddForce(Vector3.up * (_rb.velocity.magnitude * lift));
                    `}
                    </code>
                </pre>
                <p>In the keyboard-input implementation, <code>_pitch</code>, <code>_yaw</code>,
                    and <code>_roll</code> are either -1, 0, or 1. There's no way to half press down a key on the
                    keyboard. Pilots have a lot more fine-grained control with the serial version, because the force can
                    be anywhere in the range of [-1, 1].</p>

                <h5 className={'h5'}>Serial communication</h5>
                <h6 className={'h6'}>Setup</h6>

                <p>
                    This project makes heavy use of the <a href={'https://ardity.dwilches.com/'}>Ardity Unity
                    package</a>, which provides a pretty simple way of
                    achieving bidirectional communication between Unity and an Arduino. I attached the
                    package's <code>SerialController</code> script to my plane, filled in the port and the baud rate,
                    set the MessageListener to the plane object, and was ready to start communicating.
                </p>
                <h6 className={'h6'}>Sending/Receiving Messages</h6>

                <p>I sent messages using Ardity's provided <code>OnMessageRecieved</code> method, and sent messages to
                    the ESP32 using the <code>SerialController.sendMessage</code> method. To get the Unity to Arduino
                    communication working, I had to restrict the number of messages I sent so as to not overwhelm the
                    ESP32's queue of messages. Once I processed the messages, it was easy to scale the sensor input
                    to a range of [-1, 1] and use them as <code>_pitch</code>, <code>_yaw</code>,
                    and <code>_roll</code>.</p>


            </Col>
        </Row>

        <Row className="footer">
        <Col md={12} className="justify-content-right">
                Check out{" "}
                <a href="https://github.com/avahajr/serial-flight-sim">the repo!</a>
            </Col>
        </Row>
    </Container>);
}

export default BlogPost2;
