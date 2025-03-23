import { user_views_path, user_view_path } from 'routes'
import { Alert } from 'react-alert'

export class Actions {
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
            visibility: visibility,
            filters: filters,
            user_id: userId
          }
        })
      },
    ).then((response) => response.json())
    .then((data) => {
        if (data.success) {
          alert('View created successfully')
        } else {
          alert('View creation failed')
        }
      })
      .catch((error) => console.log(error));
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
            visibility: visibility,
            filters: filters
          }
        })
      },
    ).then((response) => response.json())
    .then((data) => {
        if (data.success) {
          alert('View updated successfully')
        } else {
          alert('View update failed')
        }
      })
      .catch((error) => console.log(error));
  }

  static getViews(userId, callback) {
    fetch(
      user_views_path(userId),
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      },
    ).then((response) => response.json())
      .then((data) => {
        if (callback) {
          callback(data.views)
        }
      })
      .catch((error) => console.log(error));
  }
}