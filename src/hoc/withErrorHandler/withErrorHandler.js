import React, {Component} from 'react';
import Modal from '../../components/UI/Modal/Modal';
import Aux from '../../hoc/Aux';

const withErrorHandler = (WrappedComponent, axios) =>  
        (class extends Component {

            state = {
                error: null,
            }

            componentWillMount () {
                this.reqInterceptor = axios.interceptors.request.use(req => {
                    this.setState({error : null})
                    return req;
                })
                this.resInterceptor = axios.interceptors.response.use(res => res, error => {
                    this.setState({error})
                    return Promise.reject(error);
                })
            }

            componentWillUnmount () {
                //removes interceptors after unmounting thus preventing memory leaks
                axios.interceptors.request.eject(this.reqInterceptor);
                axios.interceptors.response.eject(this.resInterceptor);
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