import React, {Component} from 'react';
import Modal from '../../components/UI/Modal/Modal';
import Aux from '../../hoc/Aux';

const withErrorHandler = (WrappedComponent, axios) =>  
        (class extends Component {

            state = {
                error: null,
            }

            componentDidMount () {
                axios.interceptors.request.use(req => {
                    this.setState({error : null})
                    return req;
                })
                axios.interceptors.response.use(res => res, error => {
                    this.setState({error})
                })
            }

            errorConfirmedHandler = () => {
                this.setState({error: null})
            }

            render () {
                return (
                    <Aux>
                        <Modal closeModal={this.errorConfirmedHandler} show={this.state.error}>
                            {this.state.error ? this.state.error.message : null}
                        </Modal>
                        <WrappedComponent {...this.props} />
                    </Aux>
                )
            }
        })


export default withErrorHandler;