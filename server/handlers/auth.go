package handlers

import (
	authdto "landtick/dto/auth"
	dto "landtick/dto/result"
	"landtick/repositories"
	"net/http"

	"github.com/golang-jwt/jwt/v4"
	"github.com/labstack/echo/v4"
)

type handlerAuth struct {
	AuthRepository repositories.AuthRepository
}

func HandlerAuth(AuthRepository repositories.AuthRepository) *handlerAuth {
	return &handlerAuth{AuthRepository}
}

func (h *handlerAuth) CheckAuth(c echo.Context) error {
	userLogin := c.Get("userLogin")
	userId := userLogin.(jwt.MapClaims)["id"].(float64)

	user, err := h.AuthRepository.GetUserAuth(int(userId))
	if err != nil {
		return c.JSON(http.StatusInternalServerError, dto.ErrorResult{Code: http.StatusInternalServerError, Message: err.Error()})
	}

	checkAuth := authdto.CheckAuthResponse{ID: user.ID,
		Name:  user.Name,
		Email: user.Email,
		Role:  user.Role,
	}

	return c.JSON(http.StatusOK, dto.SuccessResult{Status: "Success", Data: checkAuth})
}
