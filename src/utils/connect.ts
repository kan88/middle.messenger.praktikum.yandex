import store, { StoreEvents } from './Store'
import isEqual from './isEqual';


function connect(mapStateToProps: (state: Indexed) => Indexed) {
  return function (Component: typeof Block) {
    return class extends Component {
      constructor(props) {
        // сохраняем начальное состояние
        let state = mapStateToProps(store.getState());
        console.log(state)
        super('div', { ...props, ...state });

        // подписываемся на событие
        store.on(StoreEvents.Updated, () => {
          // при обновлении получаем новое состояние
          const newState = mapStateToProps(store.getState());
          console.log(newState)
          // если что-то из используемых данных поменялось, обновляем компонент
          if (!isEqual(state, newState)) {
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
