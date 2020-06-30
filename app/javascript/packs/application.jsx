import React from 'react'
import ReactDOM from 'react-dom'
import { Layout, Menu, Breadcrumb } from 'antd'

import 'antd/dist/antd.css'

const { Header, Content, Footer } = Layout

document.addEventListener('DOMContentLoaded', () => {
    ReactDOM.render(
        <Layout>
            <Header style={{ position: 'fixed', zIndex: 1, width: '100%' }}>
                <div className="logo" />
                <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']}>
                    <Menu.Item key="1">nav 1</Menu.Item>
                    <Menu.Item key="2">nav 2</Menu.Item>
                    <Menu.Item key="3">nav 3</Menu.Item>
                </Menu>
            </Header>
            <Content className="site-layout" style={{ padding: '0 50px', marginTop: 64 }}>
                <div id='root'/>
            </Content>
            <Footer style={{ textAlign: 'center' }}>Live Music ©2020 Created by Dounx</Footer>
        </Layout>,
        document.body.appendChild(document.createElement('div')),
    )
})