import * as bp3 from '@blueprintjs/core'
function login() {
    return (
        <div className={style.container}>
            <div>
                <bp3.FormGroup>
                    <bp3.Text className={style.title}>Login</bp3.Text>
                </bp3.FormGroup>

                <bp3.FormGroup labelFor='username'>
                    <bp3.InputGroup
                        id='email'
                        placeholder='email'
                        leftIcon='envelope'
                        className={style.input}
                    />
                </bp3.FormGroup>
                <bp3.FormGroup labelFor='password'>
                    <bp3.InputGroup
                        id='password'
                        placeholder='password'
                        leftIcon='lock'
                        className={style.input}
                    />
                </bp3.FormGroup>
                <bp3.Button intent={bp3.Intent.PRIMARY} text='Login' />
            </div>
        </div>
    )

}

export default login
