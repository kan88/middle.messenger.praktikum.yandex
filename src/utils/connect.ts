import store, { StoreEvents } from './Store'

function connect(mapStateToProps: (state: Indexed) => Indexed) {
  return function (Component: typeof Block) {
    return class extends Component {
      constructor(props) {
        console.log('попали в конструктор')
        // сохраняем начальное состояние
        super('div', { ...props, ...mapStateToProps(store.getState()) });

        store.on(StoreEvents.Updated, () => {
          this.setProps({ ...mapStateToProps(store.getState()) });
        });

      }
    }
  }
}


export default connect;
