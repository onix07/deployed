import { Suspense } from "react";
import "antd/dist/antd.css";
import { Layout, Menu, Breadcrumb } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { render, screen } from "@testing-library/react";

import Home from "component/Home";
const { SubMenu } = Menu;
const { Footer, Sider, Content } = Layout;
function App() {
  return (
    <div>
      <Layout>
        <Layout>
          <Sider width={200} className='site-layout-background'>
            <Menu
              mode='inline'
              defaultSelectedKeys={["1"]}
              defaultOpenKeys={["sub1"]}
              style={{ height: "100%", borderRight: 0 }}
            >
              <SubMenu
                key='sub1'
                icon={<UserOutlined />}
                title='Dashboard Menu'
              >
                <Menu.Item key='1'>Home</Menu.Item>
                <Menu.Item key='2'>Test 1</Menu.Item>
              </SubMenu>
            </Menu>
          </Sider>
          <Content>
            <Home />
          </Content>
        </Layout>
        <Footer style={{ textAlign: "center" }}>
          Sample Design ©2021 Created by: Deployed
        </Footer>
      </Layout>
    </div>
  );
}

export default App;
