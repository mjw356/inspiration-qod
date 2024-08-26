import './App.css';
import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import {
  Container, Row, Col, Navbar, Nav, ButtonGroup, Button,
} from 'react-bootstrap';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      message: '',
      author: '',
      imgStyle: {
        backgroundImage: '',
        backgroundSize: 'cover',
      },
      showAbout: false,
    };

    this.getRandomMessage = this.getRandomMessage.bind(this);
    this.getMessage = this.getMessage.bind(this);
    this.getMod = this.getMod.bind(this);
    this.getImage = this.getImage.bind(this);
    this.showAbout = this.showAbout.bind(this);
  }

  componentDidMount() {
    this.getImage();
    this.getMod();
  }

  getRandomMessage() {
    this.getMessage('https://node.inspirationqod.com/api/randomquote');
  }

  getMod() {
    this.getMessage('https://node.inspirationqod.com/api/qod');
  }

  getMessage(url) {
    fetch(url, {
      mode: 'cors',
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
    })
      .then((res) => res.json())
      .then((message) => {
        this.setState({
          message: message.q,
          author: message.a,
          showAbout: false,
        });
      });
  }

  getImage() {
    fetch('https://node.inspirationqod.com/api/iod', {
      mode: 'cors',
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
    })
      .then((res) => res.json())
      .then((img) => {
        this.setState((state) => {
          const imgStyle = { ...state.imgStyle };
          imgStyle.backgroundImage = `
            url(https://node.inspirationqod.com/images/${img.name})`;
          return { imgStyle };
        });
      });
  }

  showAbout() {
    this.setState({ showAbout: true });
  }

  render() {
    let msgContainer = '';
    const {
      message, author, imgStyle, showAbout,
    } = this.state;
    const msgBlock = (
      <blockquote
        className="blockquote text-center"
        style={{ fontSize: '2.5em' }}
      >
        <p className="mb-0">{message}</p>
        <footer className="blockquote-footer">{author}</footer>
      </blockquote>
    );
    const aboutBlock = (
      <div>
        <h1>What is this?</h1>
        <p>
          Inspiration q.o.d. (quote of the day) is a small
          site setup to give a bit
          of daily inspiration.  Each day a random quote is
          shown as the quote of the day
          along with a random image as the image of the day.
          You can get a new quote
          by clicking on the &quot;Get a new quote&quot; button.
        </p>
        <p>
          We hope you enjoy the site and find inspiration on your journey!
        </p>
        <p>
          All quotes are from the
          {' '}
          <a href="https://zenquotes.io/">Zen Quotes API</a>
          <br />
          Questions or comments?  Contact us -
          {' '}
          <a href="mailto:admin@inspirationqod.com">admin@inspirationqod.com</a>
        </p>
      </div>
    );

    if (showAbout) {
      msgContainer = aboutBlock;
    } else {
      msgContainer = msgBlock;
    }
    return (
      <div className="App">
        <div className="vh-height-100 img" style={imgStyle}>
          <Container className="d-flex flex-column vh-height-100">
            <Row>
              <Col>
                <Navbar className="link-white">
                  <Navbar.Brand className="logo">
                    <img
                      style={{ maxWidth: 50 }}
                      alt="logo"
                      src="https://node.inspirationqod.com/images/inspirationqodlogo.png"
                    />
                    <span className="d-none d-sm-inline ml-5">
                      Inspiration q.o.d.
                    </span>
                  </Navbar.Brand>
                  <Nav className="ml-auto">
                    <Button
                      variant="light"
                      onClick={this.showAbout}
                    >
                      About
                    </Button>
                  </Nav>
                </Navbar>
              </Col>
            </Row>
            <Row className="flex-grow-1 set-center">
              <Col className="p-2 bd-highlight flex-grow-1">
                <div className="message-container text-white p-5 mx-auto">
                  {msgContainer}

                  <ButtonGroup aria-label="message-group">
                    <Button
                      variant="outline-secondary"
                      onClick={this.getMod}
                    >
                      Show q.o.d.
                    </Button>
                    <Button
                      variant="outline-secondary"
                      onClick={this.getRandomMessage}
                    >
                      Get a new quote
                    </Button>
                  </ButtonGroup>

                </div>
              </Col>
            </Row>
            <Row className="height-100" />
          </Container>
        </div>
      </div>
    );
  }
}
// <div className="img" style={this.imageStyle()}>
// </div>

export default App;
