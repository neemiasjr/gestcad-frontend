import React from 'react'
import Main from '../template/main'

import axios from 'axios'

const headerProps = {
    icon: 'users',
    title: 'produtos',
    subtitle: 'Cadastro de produtos'
}

const baseUrl = 'https://my-json-server.typicode.com/neemiasjr/gestcad-jsonserver/produtos'
const initState= {
    product: { img_produto:'', desc_produto:'', price: ''},
    list: []
}

export default class ProdutosCrud extends React.Component{

    state = { ...initState }

    /**Chamada quando o elemento for exibido na tela */
    componentWillMount() {
        axios.get(baseUrl,{           
            crossdomain: true
        })
        .then(resp => {
            this.setState({ list: resp.data })/**salvamos dentro da lista as requisições */
        })        
    }


    /*Limpar formulario */
    clear() {
        this.setState({ user: initState.product })
    }
    save() {
        const product = this.state.product        
        const method = product.id ? 'put' : 'post'
        const url = product.id ? `${baseUrl}/${product.id}` : baseUrl
        var config = {
            headers: {crossdomain: true}
        };
        axios[method](url,product,config)
        .then(resp => {
            const list = this.getUpdatedList(resp.data)
            this.setState({ product: initState.product, list })  
            console.log(resp.data)         
        })
        .catch(error => {
            console.log(error)
        })

    }
    getUpdatedList(product){       
        const list = this.state.list.filter(u => u.id !== product.id) /**removendo o usuario da lista */
        list.unshift(product) /**inserindo na primeira posição do array */
        return list
    }

    updatefield(event) {
        const product = { ...this.state.product }
        product[event.target.name] = event.target.value /**em target pegamos o conteúdo de input name */
        this.setState({ product })
    }
    renderForm(){
        /**jsx que ira renderizar o formulário */
        return (
            <div className="form">
                <div className="row">
                    <div className="col-12 col-md-6">
                        <div className="form-group">
                            <label htmlFor="name">Descrição Produto</label>
                            <input type="text" className="form-control" 
                                name="desc_produto" 
                                value={this.state.product.desc_produto}
                                onChange={e => this.updatefield(e)}
                                placeholder="Digite a descricao do produto.."
                                />
                        </div>
                        <div className="form-group">
                            <label htmlFor="name">URL Imagem Produto</label>
                            <input type="text" className="form-control" 
                                name="img_produto" 
                                value={this.state.product.img_produto}
                                onChange={e => this.updatefield(e)}
                                placeholder="Digite a URL do produto.."
                                />
                        </div>

                        <div className="form-group">
                            <label htmlFor="name">Preço</label>
                            <input type="text" className="form-control" 
                                name="price" 
                                value={this.state.product.price}
                                onChange={e => this.updatefield(e)}
                                placeholder="Digite o valor do produto.."
                                />
                        </div>
                    </div>
                </div>

                <hr />

                <div className="row">
                    <div className="col-12 d-flex justify-content end">
                        <button className="btn btn-primary"
                        onClick={e => this.save(e)}>Salvar</button>
                        <button className="btn btn-secondary ml-2"
                        onClick={e => this.save(e)}>Cancelar</button>
                    </div>
                </div>

            </div>
        );
    }


    /**edição */
    load(product){
        this.setState({ product })/**atualiza o estado da aplicação. */
    }
    remove(product){
        axios.delete(`${baseUrl}/${product.id}`)
        .then(resp => {
            const list = this.state.list.filter(u => u !== product)
            this.setState({ list })
        })
    }

    /**list users */
    rendertable(){
        return(
            <table className="table mt-4">
               <thead>
                    <tr>
                        <th>Imagem do Produto</th>
                        <th>Descriçao do Produto</th>
                        <th>Preço</th>
                        <th>Editar</th>
                    </tr>
                </thead>
                <tbody>
                    {this.renderows()}
                </tbody>            
            </table>
        );
    }
    renderows(){
        /**mapeando usuários que estão no estado do objeto */
        return this.state.list.map((product,index) => {
            return (                
                <tr key={index}>
                    <td><img src={product.img_produto} /></td>
                    <td>{product.desc_produto}</td>
                    <td>{product.price}</td>
                    <td>
                        <button className="btn btn-warning mr-2"
                        onClick={() => this.load(product)}>
                            <i className="fa fa-pencil"></i>
                        </button>
                        <button className="btn btn-danger"
                        onClick={() => this.remove(product)}>
                            <i className="fa fa-trash"></i>
                        </button>
                    </td>
                </tr>
            );
        })
    }



    render(){        
        return(            
            <Main {...headerProps}>
                
                {this.renderForm()}
                {this.rendertable()}

            </Main>
        );
    }
}