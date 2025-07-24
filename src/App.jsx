import styled from "styled-components";
import GlobalStyles from "./styles/GlobalStyle";
import Button from "./ui/Button";
import Input from "./ui/Input";
import Heading from "./ui/Heading";
import Row from "./Row";

const StyledApp = styled.div`
  padding: 20px;
`;

function App() {
  return (
    <>
      <GlobalStyles />
      <StyledApp>
        <Row type="vertical">
          <Row type="horizontal">
            <Heading as="h1"> The Oasis</Heading>
            <div>
              <Heading as="h2"> Check in and out</Heading>
              <Button variation="primary" size="medium" onClick={() => alert("Check in")}>
                Check in
              </Button>
              <Button
                variation="secondary"
                size="small"
                onClick={() => alert("Check in")}
              >
                Check out
              </Button>
            </div>
          </Row>

          <Row type="vertical">
            <Heading as="h3"> Form</Heading>
            <form>
              <Input type="number" placeholder="Number of guests" />
              <Input type="number" placeholder="Number of guests" />
            </form>
          </Row>
        </Row>
      </StyledApp>
    </>
  );
}

export default App;
