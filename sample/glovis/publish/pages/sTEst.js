import AppLayout from '@src/components/layouts/AppLayout'
import MenuItem from '@lib/share/menu/MenuItem';
import MenuTitle from '@lib/share/menu/MenuTitle';
import MenuCont from '@lib/share/menu/MenuCont';

const Stest= () =>{
    return (
    <AppLayout>
        <ul className="menu-list">
            <MenuItem>
            <MenuTitle>
                <h4>Navigation</h4>
            </MenuTitle>
            <MenuCont>
                <div className="options">
                <p>Option 1</p>
                <p>Option 2</p>
                </div>
            </MenuCont>
            </MenuItem>
            <MenuItem>
            <MenuTitle>
                <h4>Navigation</h4>
            </MenuTitle>
            <MenuCont>
                <div className="options">
                <p>Option 1</p>
                <p>Option 2</p>
                </div>
            </MenuCont>
            </MenuItem>
        </ul>
    </AppLayout>
    )
}

export default Stest;