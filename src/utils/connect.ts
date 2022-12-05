import store, { StoreEvents } from './Store'
import isEqual from './isEqual';


function connect(mapStateToProps: (state: Indexed) => Indexed) {
  return function (Component: typeof Block) {
    return class extends Component {
      constructor(props) {
        console.log('попали в конструктор')
        // сохраняем начальное состояние
        let state = mapStateToProps(store.getState());
        super('div', { ...props, ...state });
        // console.log(props)
        // console.log(state)
        // подписываемся на событие
        store.on(StoreEvents.Updated, () => {
          // при обновлении получаем новое состояние
          console.log('попали в обновление стора')
          const newState = mapStateToProps(store.getState());
          console.log(state, newState)
          console.log(!isEqual(state, newState))
          // если что-то из используемых данных поменялось, обновляем компонент
          if (!isEqual(state, newState)) {
            console.log('connect')
            this.setProps({ ...newState });
          }

          // не забываем сохранить новое состояние
          state = newState;
        });
      }
    }
  }
}

export default connect;
