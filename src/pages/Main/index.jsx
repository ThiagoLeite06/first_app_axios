import React from 'react';
import { FaGithubAlt, FaPlus, FaSpinner } from 'react-icons/fa';
import { Link } from 'react-router-dom';

import api from '../../services/api';
import Container from '../../components/Container';
import { Form, SubmitButton, List, Error } from './styles';

class Main extends React.Component {
  state = {
    newRepo: '',
    repositories: [],
    loading: false,
    error: null
  };

  componentDidMount() {
    const repositories = localStorage.getItem('repositories');

    if (repositories) {
      this.setState({ repositories: JSON.parse(repositories) });
    }
  }

  // propriedades e estado antigo como parâmetros
  componentDidUpdate(_, prevState) {
    const { repositories } = this.state;

    if (prevState.repositories !== repositories) {
      localStorage.setItem('repositories', JSON.stringify(repositories));
    }
  }

  handleInputChange = (e) => {
    this.setState({ newRepo: e.target.value, error: null });
  }

  handleSubmit = async (e) => {
    e.preventDefault();

    this.setState({ loading: true, error: false });

    try {
      const { newRepo, repositories } = this.state;

      // Se essa função for chamada sem valor no newRepo
      if (newRepo === '') throw 'Você precisa indicar um repositório';

      // Verifica se já existe o repositório dentro do estado repositories
      const hasRepo = repositories.find(repository => repository.name == newRepo);
      if (hasRepo) throw 'Repositório duplicado';

      // Tentar conectar na api
      const response = await api.get(`/repos/${newRepo}`);
      // Criando um objeto com os dados que preciso da resposta da API
      const data = {
        name: response.data.full_name,
      };

      this.setState({
        repositories: [...repositories, data],
        newRepo: '',
      });

    } catch (error) {
      this.setState({ error: true })
    } finally {
      this.setState({ loading: false });
    }
  };

  render() {
    const { newRepo, loading, repositories, error } = this.state;

    return (
      <Container>
        <h1>
          <FaGithubAlt />
          Repositórios
        </h1>

        <Form onSubmit={this.handleSubmit} error={error}>

          <input
            type="text"
            placeholder="Adicionar Repositório"
            value={newRepo}
            onChange={this.handleInputChange}
          />


          <SubmitButton loading={loading}>
            {loading ? (
              <FaSpinner color="#fff" size={14} />
            )
              : (<FaPlus color="#fff" size={14} />
              )}
          </SubmitButton>

        </Form>

        <List>
          {repositories.map((repository) => (
            <li key={repository.name}>
              <span>{repository.name}</span>
              <Link to={`/repository/${encodeURIComponent(repository.name)}`}>
                Detalhes
              </Link>
            </li>
          ))}
        </List>
      </Container>
    );
  }
}

export default Main;
