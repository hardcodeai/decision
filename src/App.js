import React from 'react';
import { Container, Row, Col } from 'reactstrap';
import axios from 'axios';
import { Post } from './Components/Post.jsx'
import './App.css';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      posts: [],
      selectedUser: null,
      filterText: ""
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


  render() {
    const { users, selectedUser, posts, filterText } = this.state;
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
          <Row className="row-fluid" >
            {posts.map(post => <Post key={post.id} content={post} />)}
          </Row>
        </Container>
      </>
    );
  }
}

export default App;