import { ReactComponent as SearchSvg } from '../assets/imgs/search.svg';
import { ReactComponent as TrashSvg } from '../assets/imgs/trash.svg';
import { ReactComponent as EditSvg } from '../assets/imgs/edit.svg';

export function Admin() {
  return (
    <section className="admin">
      <div className="users-info">

        <div className="header">
          <h1>Users</h1>
          <div className="search-add">
            <div className="search">
              <input type="text" placeholder='Search By Name' />
              <SearchSvg />
            </div>
            <button>Add User</button>
          </div>
        </div>
        <div className="users">
          <div className="user">
            <div className="info">
              <div className="avatar">
                <img src={require('../assets/imgs/avatar.png')} alt="avatar" />
              </div>
              <div className="user-name">
                <h1>Full Name</h1>
                <p>@username</p>
              </div>
            </div>
            <div className="btns">
              < EditSvg />
              < TrashSvg />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
