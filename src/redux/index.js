import { createAsyncThunk } from "@reduxjs/toolkit";
import { API } from "../config/Api";
import { dataService } from "../config/DataService";

export const getAllRolePermission = createAsyncThunk(
  "fetchRole",
  async (_, { rejectWithValue }) => {
    try {
      const rolePermission_response = await dataService.get(
        API.GET_ROLES_PERMISSION
      );
      console.log("resppnseee_Api", rolePermission_response);
      if (rolePermission_response.status === 200) {
        return rolePermission_response;
      }
    } catch (err) {
      rejectWithValue(err);
    }
  }
);


export const getAllUsers = createAsyncThunk(
    "getAllUsers",
    async (_, { rejectWithValue }) => {
      try {
        const allUser_response = await dataService.get(
          API.GET_ALL_USERS
        );
        console.log("allUser_response", allUser_response);
        if (allUser_response.status === 200) {
          return allUser_response;
        }
      } catch (err) {
        rejectWithValue(err);
      }
    }
  );



  export const addRolePermission = createAsyncThunk(
    "addRolePermission",
    async (data, { rejectWithValue }) => {
      console.log(data,"commingData")
      try {
        const add_rolePermission = await dataService.post(
          API.ADD_ROLE_PERMISSION,data
        );
        console.log("add_rolePermission", add_rolePermission);
        if (add_rolePermission.status === 201) {
          return add_rolePermission;
        }
      } catch (err) {
        rejectWithValue(err);
      }
    }
  );



  export const addUser = createAsyncThunk(
    "addUser",
    async (data, { rejectWithValue }) => {
      console.log(data,"commingData")
      try {
        const add_user = await dataService.post(
          API.ADD_USER,data
        );
        console.log("add_rolePermission", add_user);
        if (add_user.status === 201) {
          return add_user;
        }
      } catch (err) {
        rejectWithValue(err);
      }
    }
  );


  export const deleteUser = createAsyncThunk(
    "deleteUser",
    async (id, { rejectWithValue }) => {
      console.log(id,"commingData")
      try {
        const delete_user = await dataService.delete(`${API.DELETE_USER}/${id}`);
        console.log("delete_USER", delete_user);
        if (delete_user.status === 200) {
          return delete_user;
        }
      } catch (err) {
        console.log(err.message,"err")
        rejectWithValue(err);
      }
    }
  );
