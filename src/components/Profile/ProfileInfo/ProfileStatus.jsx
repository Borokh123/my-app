import React from 'react'

class ProfileStatus extends React.Component { // локальный стейт живет имеено в классовой компоненте так обьект он есть и он живет и в нем можно что то хранить, в функц. визвалась потом исчезла
    state = {
        editMode: false,
        status: this.props.status
    }
    activateEditMode = () => {
        console.log('this:', this)  // вопрос из собес
        this.setState({                   // Почему editMode будет false 2 раза      
            editMode: true                // потому что Setstate асинхронен
        })                                // Отправь запрос setState тогда когда я закнсу работать в этом методе
        // console.log(this.state.editMode)

    }

    deActivateEditMode = () => {

        this.setState({
            editMode: false
        })
        this.props.updateStatus(this.state.status);
    }
    onStatusChange = (e) => {
        this.setState({
            status: e.currentTarget.value
        })
    }
    componentDidUpdate(prevProps, prevState) {

        // if (prevProps.status!=this.props.status) {
        //     this.setState({
        //         status:this.props.status
        //     });

        // }
    }
    render() {
        return (
            <div>
                {!this.state.editMode &&
                    <div>
                        <span onDoubleClick={this.activateEditMode}>{this.props.status || '------'}</span>
                    </div>
                }
                {this.state.editMode &&
                    <div>
                        <input onChange={this.onStatusChange} autoFocus={true} onBlur={this.deActivateEditMode} value={this.state.status}></input>
                    </div>
                }
            </div>
        )
    }
}

export default ProfileStatus