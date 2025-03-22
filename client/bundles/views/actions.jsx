import { user_views_path, user_view_path, base_user_views_path } from 'routes'

export class Actions {
  static getBaseView(userId, callback) {
    fetch(
      base_user_views_path(userId),
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      },
    ).then((response) => response.json())
      .then((data) => {
        if (callback) {
          callback(data.view)
        }
      })
      .catch((error) => console.log(error));
  }

  static createView(userId, base, visibility, filters) {
    fetch(
      user_views_path(userId),
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          view: {
            base: base,
            visibility: visibility,
            filters: filters,
            user_id: userId
          }
        })
      },
    )
  }

  static updateView(userId, viewId, base, visibility, filters) {
    fetch(
      user_view_path(userId, viewId),
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          view: {
            base: base,
            visibility: visibility,
            filters: filters
          }
        })
      },
    )
  }

  static getViews(userId) {
    fetch(
      user_views_path(userId),
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      },
    )
  }
}