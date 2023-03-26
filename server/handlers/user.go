package handlers

import (
	"context"
	"fmt"
	authdto "landtick/dto/auth"
	dto "landtick/dto/result"
	usersdto "landtick/dto/user"
	"landtick/models"
	"landtick/pkg/bcrypt"
	jwtToken "landtick/pkg/jwt"
	"landtick/repositories"
	"log"
	"net/http"
	"os"
	"strconv"
	"time"

	"github.com/cloudinary/cloudinary-go"
	"github.com/cloudinary/cloudinary-go/api/uploader"
	"github.com/go-playground/validator"
	"github.com/golang-jwt/jwt/v4"
	"github.com/labstack/echo/v4"
)

type handler struct {
	UserRepository repositories.UserRepository
}

func HandlerUser(UserRepository repositories.UserRepository) *handler {
	return &handler{UserRepository}
}

func (h *handler) FindAllUser(c echo.Context) error {
	users, err := h.UserRepository.FindAllUsers()
	if err != nil {
		return c.JSON(http.StatusBadRequest, dto.ErrorResult{Code: http.StatusBadRequest, Message: err.Error()})
	}
	return c.JSON(http.StatusOK, dto.SuccessResult{Status: "Success", Data: users})
}

func (h *handler) GetUser(c echo.Context) error {
	UserID, _ := strconv.Atoi(c.Param("id"))
	user, err := h.UserRepository.GetUser(UserID)
	if err != nil {
		return c.JSON(http.StatusBadRequest, dto.ErrorResult{Code: http.StatusOK, Message: err.Error()})
	}

	return c.JSON(http.StatusOK, dto.SuccessResult{Status: "Success", Data: convertResponse(user)})
}

func (h *handler) Register(c echo.Context) error {
	filepath := c.Get("dataFile").(string)
	request := usersdto.CreateUserRequest{
		Name:     c.FormValue("name"),
		UserName: c.FormValue("username"),
		Email:    c.FormValue("email"),
		Password: c.FormValue("password"),
		Phone:    c.FormValue("phone"),
		Image:    filepath,
		Role:     c.FormValue("role"),
	}

	validation := validator.New()
	err := validation.Struct(request)
	if err != nil {
		return c.JSON(http.StatusBadRequest, dto.ErrorResult{Code: http.StatusBadRequest, Message: err.Error()})
	}

	password, err := bcrypt.HashingPassword(request.Password)
	if err != nil {
		return c.JSON(http.StatusBadRequest, dto.ErrorResult{Code: http.StatusBadRequest, Message: err.Error()})
	}
	var ctx = context.Background()
	var CLOUD_NAME = os.Getenv("CLOUD_NAME")
	var API_KEY = os.Getenv("API_KEY")
	var API_SECRET = os.Getenv("API_SECRET")

	cld, _ := cloudinary.NewFromParams(CLOUD_NAME, API_KEY, API_SECRET)
	resp, err := cld.Upload.Upload(ctx, filepath, uploader.UploadParams{Folder: "LandTick/users"})
	if err != nil {
		fmt.Println(err.Error())
	}

	user := models.User{
		Name:          request.Name,
		Email:         request.Email,
		Username:      request.UserName,
		Phone:         request.Phone,
		Password:      password,
		Role:          request.Role,
		Image:         resp.SecureURL,
		ImagePublicID: resp.PublicID,
	}

	data, err := h.UserRepository.Register(user)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, dto.ErrorResult{Code: http.StatusInternalServerError, Message: err.Error()})
	}

	return c.JSON(http.StatusOK, dto.SuccessResult{Status: "Success", Data: data})
}

func (h *handler) Login(c echo.Context) error {
	request := new(authdto.LoginRequest)
	if err := c.Bind(request); err != nil {
		return c.JSON(http.StatusBadRequest, dto.ErrorResult{Code: http.StatusBadRequest, Message: err.Error()})
	}

	user := models.User{
		Email:    request.Email,
		Password: request.Password,
	}

	// Check email
	user, err := h.UserRepository.Login(user.Email)
	if err != nil {
		return c.JSON(http.StatusBadRequest, dto.ErrorResult{Code: http.StatusBadRequest, Message: "Couldn't find your email"})
	}

	// Check password
	isValid := bcrypt.CheckPasswordHash(request.Password, user.Password)
	if !isValid {
		return c.JSON(http.StatusBadRequest, dto.ErrorResult{Code: http.StatusBadRequest, Message: "Wrong password, try again"})
	}

	//generate token
	claims := jwt.MapClaims{}
	claims["id"] = user.ID
	claims["exp"] = time.Now().Add(time.Hour * 2).Unix() // 2 hours expired

	token, errGenerateToken := jwtToken.GenerateToken(&claims)
	if errGenerateToken != nil {
		log.Println(errGenerateToken)
		return echo.NewHTTPError(http.StatusUnauthorized)
	}
	loginResponse := authdto.LoginResponse{
		ID:       user.ID,
		Email:    user.Email,
		Name:     user.Name,
		Username: user.Username,
		Token:    token,
		Role:     user.Role,
		Image:    user.Image,
	}

	return c.JSON(http.StatusOK, dto.SuccessResult{Status: "Success", Data: loginResponse})
}

func (h *handler) DeleteUser(c echo.Context) error {
	id, _ := strconv.Atoi(c.Param("id"))

	user, err := h.UserRepository.GetUser(id)
	if err != nil {
		return c.JSON(http.StatusBadRequest, dto.ErrorResult{Code: http.StatusBadRequest, Message: err.Error()})
	}

	data, err := h.UserRepository.DeleteUser(user)

	if err != nil {
		return c.JSON(http.StatusInternalServerError, dto.ErrorResult{Code: http.StatusInternalServerError, Message: err.Error()})
	}
	return c.JSON(http.StatusOK, dto.SuccessResult{Status: "Delete Success", Data: convertResponse(data)})
}

func convertResponse(u models.User) usersdto.UserResponse {
	return usersdto.UserResponse{
		ID:       u.ID,
		Name:     u.Name,
		Username: u.Username,
		Phone:    u.Phone,
		Email:    u.Email,
		Image:    u.Image,
	}
}
