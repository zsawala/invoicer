import { user_views_path, user_view_path } from 'routes'

export class Actions {
  static createView(userId, visibility, filters) {
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
            filters: filters
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

  static updateView(userId, viewId, visibility, filters) {
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

  static getViews(userId, setView = null, setViews = null) {
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
        if (setView) {
          setView(data.views[0])
        }

        if (setViews) {
          setViews(data.views)
        }
      })
      .catch((error) => console.log(error));
  }
}