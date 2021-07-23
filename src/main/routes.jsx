import React from 'react'
import { Switch, Route, Redirect } from 'react-router'

import Home from '../components/home/home'
import UserCrud from '../components/user/user-crud'
import ProdutosCrud from '../components/produtos/produtos-crud'

/*Mapeamento dos links aos componentes*/
export default props =>
    <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/users" component={UserCrud} />
        <Route exact path="/produtos" component={ProdutosCrud} />
        <Redirect from="*" to="/" />
    </Switch>


