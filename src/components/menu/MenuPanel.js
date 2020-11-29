import React from 'react'
import style from './MenuPanel.css'

class MenuPanel extends React.Component {
    handleClick = () => {
        console.log(this, 'Add link!')
    }

    render() {
        return (
            <div className={style.container}>
                Menu Panel
                <button
                    className={style.buttonAddLink}
                    onClick={this.handleClick}
                >
                    Add link thread
                </button>
            </div>
        )
    }
}

export default MenuPanel
