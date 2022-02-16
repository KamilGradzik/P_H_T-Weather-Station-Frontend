import './navbar.scss'
import React, { FC, useContext } from 'react'
import { useState }  from 'react'
import { FaChevronLeft, FaChevronDown } from 'react-icons/fa'
import { Sensor } from '../../models/sensor';
import City from '../../models/city';
import { Language } from '../../models/language';
import WeatherContext from '../../context/weather-context';

interface DropDownProps {
    title?: string,
    classname: string,
    items: Sensor[] | City[] | Language[],
    setter: (x: Language | City | Sensor) => void,
    selectedItem: Language | City | Sensor
}

const DropDown: FC<DropDownProps> = ( props ) => {
    // let dropList:HTMLElement;
    // let btn:HTMLElement;
    //
    // const [icon,setIcon] = useState( <FaChevronLeft/>)
    // const [isActive, setState] = useState(false)
    // const [activeList,setActiveList] = useState(dropList)
    // const [clickedBtn, setBtn] = useState(btn);
    // const {getReadings} = useContext(WeatherContext);
    //
    //
    // const clickFun = (e:any) => {
    //     setState(!isActive)
    //     dropList = e.target.nextSibling
    //     setBtn(e.target);
    //     if(isActive)
    //     {
    //         e.target.setAttribute('style','border-radius:20px')
    //         setIcon(<FaChevronLeft/>)
    //         setActiveList(dropList)
    //         dropList.setAttribute('style','display:none')
    //     }
    //     else
    //     {
    //         e.target.setAttribute('style','border-radius:20px 20px 0px 0px')
    //         setActiveList(dropList)
    //         setIcon(<FaChevronDown/>)
    //         dropList.setAttribute('style','display:block')
    //     }
    // }
    //
    // const hideDropList = () => {
    //     if(isActive)
    //     {
    //         clickedBtn.setAttribute('style','border-radius:20px')
    //         setIcon(<FaChevronLeft/>)
    //         activeList.setAttribute('style','display:none')
    //         setState(false)
    //     }
    // }

    // const handleSelect = ((x: Language | City | Sensor) => {
    //     props.setter(x);
    //     hideDropList();
    //     if (x.city_name) {
    //         getReadings(x.id);
    //     }
    // })

    return(
        <></>
        // <div className={props.classname} onMouseLeave={() => hideDropList()}>
        // <button className='dropDown' onClick={(e) => clickFun(e)}>{props.selectedItem?.name || props.selectedItem?.sensor_name || props.selectedItem?.city_name || props.title}<span className='dropDownIcon'>{icon}</span></button>
        //         {/*<div className='dropDown-Content'>*/}
        //         {/*    {props.items?.length && props.items.map(x => <a key={x.id} onClick={() => handleSelect(x)}>{x.name || x.city_name || x.sensor_name}</a>)}*/}
        //         {/*</div>*/}
        // </div>
    )
   
}

DropDown.defaultProps = {
    title: 'Dropdown-PlaceHolder'
}

export default DropDown