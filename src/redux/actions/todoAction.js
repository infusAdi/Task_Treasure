
import { ADD_ITEM, EDIT_ITEM, REMOVE_ITEM, STATUS_COMPLETE, STATUS_ONGOING, STATUS_PAUSED } from "./actionsTypes"

export const add_item = (item) => {
    return {
        type: ADD_ITEM,
        payload: item,
    }
}

export const remove_item = (id) => {
    return {
        type: REMOVE_ITEM,
        payload: id,
    }
}

export const edit_item = (item) => {
    return {
        type: EDIT_ITEM,
        payload: item,
    }
}

export const status_complete = (id) => {
    return {
        type: STATUS_COMPLETE,
        payload: id,
    }
}

export const status_ongoing = (id) => {
    return {
        type: STATUS_ONGOING,
        payload: id,
    }
}

export const status_paused = (id) => {
    return {
        type: STATUS_PAUSED,
        payload: id,
    }
}