import React from 'react';
import { Container, Row, Col } from 'reactstrap';
import axios from 'axios';
import { Post } from './Components/Post.jsx'
import { Button } from 'reactstrap';
import './App.css';
import { User } from './Components/User.jsx';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      posts: [],
      selectedUser: null,
      filterText: "",
      sideModal: true
    };
  }

  componentDidMount() {
    axios({
      method: 'get',
      url: 'https://jsonplaceholder.typicode.com/users'
    })
      .then(data => {
        this.setState({ users: data.data });
      })
      .catch(err => alert(err.message));
  }

  setSelectUser(id) {
    this.setState({ selectedUser: id });

    axios({
      method: 'get',
      url: `https://jsonplaceholder.typicode.com/posts?userId=${id}`
    })
      .then(response => this.setState({ posts: response.data }))
      .catch(err => console.log(err));
  }

  removePopup() {
    this.setState({ sideModal: false });
  }

  render() {
    const { users, selectedUser, posts, filterText, sideModal } = this.state;
    return (
      <>
        <Container>
          <Row>
            <Col sm="12" md={{ size: 6, offset: 3 }}>
              <div id="selectise-wrapper">
                <input className="selectise-input"
                  type="text"
                  placeholder="Filter dropdown here"
                  value={filterText}
                  onChange={e => this.setState({ filterText: e.target.value })}
                />
                <select className="selectise-options"
                  onChange={e => this.setSelectUser(e.target.value)}
                  value={selectedUser || "default"}
                >
                  <option value="default">Select a user</option>
                  {users
                    .filter(user => !filterText ? true : user.username.match(new RegExp(filterText, 'ig')))
                    .map(user => <option key={user.id} value={user.id}>{user.username}</option>)}
                </select>
              </div>
            </Col>
          </Row>

          {sideModal && selectedUser && <Row>
            <Col className={sideModal ? `slide-in-right` : `slide-out-right`} style={this.popUpStyle}>
              <div style={{ minHeight: '200px' }}>
                {users
                  .filter(user => (user.id == selectedUser))
                  .map(user => <User key={user.id} user={user}></User>)}
              </div>
              <Button onClick={e => this.removePopup()} color="info">Close</Button>
            </Col>
          </Row>}

          <Row className="row-fluid">
            {posts.map(post => <Post key={post.id} content={post} />)}
          </Row>
        </Container>
        {/* {filterText.length !== 0 &&
          users
            .filter(user => !filterText ? true : user.username.match(new RegExp(filterText, 'ig')))
            .map(user => <Floater key={user.id} content={JSON.stringify({ user })}>
              <span>click me</span>
            </Floater>)
        } */}
      </>
    );
  }


  popUpStyle = {
    background: '#adefd1ff',
    minHeight: '250px',
    position: 'fixed',
    top: '100px',
    left: '78.125vw',
    zIndex: '10',
    padding: '10px',
    borderRadius: '5px',
  }

}

export default App;