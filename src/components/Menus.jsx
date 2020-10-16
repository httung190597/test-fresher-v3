import React from 'react';
import { Link, Route } from 'react-router-dom';

const menus = [
    {
        name : 'Home',
        to :'/test-fresher',
        exact : true
    },
    {
        name : 'Order Food',
        to :'/order-food',
        exact : false
    }
]
const MenuLink = ({ label, to, activeOnlyWhenExact }) => {
    return (
        <Route
            path={to}
            exact={activeOnlyWhenExact}
            children={({ match }) => {
                var active = match ? 'active' : '';
                return (
                    <li className={active}>
                        <Link to={to} className="my-link">{label}</Link>
                    </li>
                )
            }}
        />
    );
}
function Menus(){

    function showMenus(menus){
        var result = null;
        if (menus.length > 0) {
            result = menus.map((menu, index) => {
                return (
                    <MenuLink key={index} label={menu.name} to={menu.to} activeOnlyWhenExact={menu.exact} />
                );
            });
        }
        return result;
    }



    return (
        <nav className="navbar navbar-default">
            <ul className="nav navbar-nav">
                {showMenus(menus) }
            </ul>
        </nav>
    );

}

export default Menus;