import { Component } from 'react';
import ReactDOM from 'react-dom';
import ListIterator from 'Components/ListIterator';
import FormComponent from 'Components/FormComponent';
import { backendUrl } from 'Config';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
    };
    this.handleDelete = this.handleDelete.bind(this);
    this.handleUserInput = this.handleUserInput.bind(this);
  }

  componentDidMount() {
    axios.get(`${backendUrl}/todos`)
      .then((response) => {
        this.setState({
          items: response.data,
        });
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  handleDelete(elementToBeDeleted) {
    const items = this.state.items.filter(item => item._id !== elementToBeDeleted);
    axios.delete(`${backendUrl}/todo`, {
      data: { _id: elementToBeDeleted },
    })
      .then((response) => {
        this.setState({
          items,
        });
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  handleUserInput(valueOfUserInput) {
    const items = [...this.state.items],
      duplicateInput = items.some(item => item.description.toLowerCase() === valueOfUserInput.toLowerCase());
    if (duplicateInput) {
      alert('Duplicate Input');
      return;
    }
    axios.post(`${backendUrl}/todo`, {
      description: valueOfUserInput,
    })
      .then((response) => {
        items.push({
          _id: response.data,
          description: valueOfUserInput,
        });
        this.setState({
          items,
        });
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  render() {
    const { items } = this.state;
    return (
      <div className="container">
        <h1 className="text-center">To Do App</h1>
        <div className="row">
          <div className="col-md-6 offset-md-3">
            <FormComponent validateUserInput={this.handleUserInput} />
            <ListIterator listItems={items} deleteItem={this.handleDelete} />
          </div>
        </div>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('todoApp'));
