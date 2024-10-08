import React, {
  CSSProperties,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { FaRegSmile, FaRegEye } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";

import {
  SidebarTitle,
  StickyFilterContainer,
  FilterSectionItem,
  HamburgerButton,
} from "./sideBarStyles/sideBarStyle";
import {
  PriceRangeInputs,
  PriceRangeContainer,
} from "./sideBarStyles/priceRangeStyles";
import { FilterInput, PriceRangeInput } from "./sideBarStyles/inputStyles";
import { FilterButtons } from "./sideBarStyles/buttonStyles";
import Slider from "@mui/material/Slider";

import { makeStyles } from "@mui/styles";

import Select, {
  components,
  GroupBase,
  MenuListProps,
  OptionProps,
  StylesConfig,
} from "react-select";
import { motion } from "framer-motion";
import {
  setPriceRange,
  setSearchTerm,
  setSelectedCategory,
  setSelectedColor,
  setSelectedMarca,
} from "@/redux/features/productsFilterSlice/FilterSlice";
import { RootState } from "@/redux/store";
import {
  setSidebarExpanded,
  setSidebarOpenedByButton,
} from "@/redux/features/uiSlice/uiSlice";
const menuAnimation = {
  initial: { opacity: 0, y: -20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: 20 },
};

const CustomMenuList = <
  Option,
  IsMulti extends boolean,
  Group extends GroupBase<Option>
>(
  props: MenuListProps<Option, IsMulti, Group>
) => {
  const menuListContainerStyles: CSSProperties = {
    maxHeight: "190px",
    overflowY: "auto" as const,
  };

  return (
    <div style={menuListContainerStyles}>
      <motion.div
        initial="initial"
        animate="animate"
        exit="exit"
        variants={menuAnimation}
        transition={{ duration: 0.3 }}
      >
        <components.MenuList {...props} />
      </motion.div>
    </div>
  );
};

const CustomOption = <
  Option,
  IsMulti extends boolean,
  Group extends GroupBase<Option>
>(
  props: OptionProps<Option, IsMulti, Group>
) => <components.Option {...props} />;

const useStyles = makeStyles({
  sliderHorizontal: {
    width: "100%",
    "& .MuiSlider-thumb": {
      color: "#ffd700", // Dorado
      "&:hover, &.Mui-focusVisible": {
        backgroundColor: "#b0a700", // Amarillo apagado al pasar el mouse
      },
      "&.Mui-active": {
        boxShadow: `0px 0px 0px 14px rgba(176, 167, 0, 0.16)`, // Sombra amarilla apagada suave
      },
    },
    "& .MuiSlider-rail": {
      backgroundColor: "#000", // Negro
    },
    "& .MuiSlider-track": {
      backgroundColor: "#ffd700", // Amarillo para la pista recorrida
      border: "none",
    },
    "& .MuiSlider-valueLabel": {
      color: "#ffd700", // Dorado para la etiqueta del valor
    },
    "& .MuiSlider-thumb.Mui-focusVisible, & .MuiSlider-thumb:hover": {
      boxShadow: "none",
    },
  },
});

const isBrowser = typeof window !== "undefined";

const isMobileDevice = () => {
  if (isBrowser) {
    return window.innerWidth <= 768;
  }
  return false; // Valor predeterminado para SSR
};
const CombinedFilterComponent: React.FC = () => {
  const classes = useStyles();
  const [isSelectMenuOpen, setIsSelectMenuOpen] = useState(false);
  const [forceShowScrollbar, setForceShowScrollbar] = useState(false);
  const [isSidebarControlledByButton, setIsSidebarControlledByButton] =
    useState(false);

  const [isMobile, setIsMobile] = useState(
    isBrowser ? isMobileDevice() : false
  );
  const [isSubMenuOpen, setIsSubMenuOpen] = useState(false);
  const toggleSubMenu = () => {
    setIsSubMenuOpen(!isSubMenuOpen);
  };
  const dispatch = useDispatch();
  const sidebarRef = useRef<HTMLDivElement>(null);
  const [scrollY, setScrollY] = useState(0);
  const [isButtonVisible, setIsButtonVisible] = useState(false);

  const searchTerm = useSelector((state: RootState) => state.filter.searchTerm);
  const priceRange = useSelector((state: RootState) => state.filter.priceRange);
  const [isSticky, setIsSticky] = useState(false);
  const [isExpanded, setIsExpanded] = useState(!isMobile);
  const [isFilterOpen, setIsFilterOpen] = useState(!isMobile);
  const [hasScrolled, setHasScrolled] = useState(false);
  const [menuPortalTarget, setMenuPortalTarget] = useState<HTMLElement | null>(
    null
  );
  const [isColorMenuOpen, setIsColorMenuOpen] = useState(false);
  const [isMarcaMenuOpen, setIsMarcaMenuOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  const selectedColor = useSelector(
    (state: RootState) => state.filter.selectedColor
  );
  const selectedCategory = useSelector(
    (state: RootState) => state.filter.selectedCategory
  );
  const selectedMarca = useSelector(
    (state: RootState) => state.filter.selectedMarca
  );
  const handleWindowChange = useCallback(() => {
    const isMobileView = isMobileDevice();
    setIsMobile(isMobileView);

    if (isMobileView) {
      setIsExpanded(false);
      setIsFilterOpen(false);
    } else {
      setIsExpanded(window.scrollY === 0);
      setIsFilterOpen(true);
    }
  }, []);
  const customStyles: StylesConfig = {
    control: (provided, state) => ({
      ...provided,
      minWidth: "200px",
      margin: 0,
      padding: 0,
      borderRadius: "30px",
      backgroundColor: "#000000", // Fondo negro
      borderColor: state.isFocused ? "#ffd700" : provided.borderColor, // Dorado al enfocar
      boxShadow: state.isFocused ? "0 0 0 1px #ffd700" : provided.boxShadow, // Sombra dorada
      "&:hover": {
        borderColor: state.isFocused ? "#ffd700" : provided.borderColor, // Cambio a dorado al pasar el mouse
      },
      marginTop: 0,
    }),
    menu: (provided) => ({
      ...provided,
      position: "absolute",
      width: "100%",
      maxHeight: "150px",
      overflowY: "auto",
      zIndex: 9999,
      backgroundColor: "#000000", // Fondo negro para el menú desplegable
      borderRadius: "25px",
    }),
    menuPortal: (base) => ({
      ...base,
      zIndex: 9999,
      marginTop: "0px",
      borderRadius: "25px",
    }),
    option: (provided, state) => ({
      ...provided,
      maxHeight: "150px",
      overflowY: "auto",
      borderRadius: "20px",
      backgroundColor: state.isFocused
        ? "rgba(255, 215, 0, 0.4)" // Fondo dorado más fuerte al enfocar
        : "#2b2b2b", // Fondo oscuro predeterminado
      color: state.isFocused ? "#ffffff" : "#eaeaea", // Texto blanco al enfocar, claro por defecto

      "&:hover": {
        backgroundColor: "#ffd700", // Fondo dorado al pasar el mouse
        color: "#1c1c1c", // Texto oscuro al pasar el mouse
      },
    }),
    menuList: (provided) => ({
      ...provided,
      maxHeight: "150px",
      overflowY: "visible",
      borderRadius: "25px",
      backgroundColor: "#000000", // Fondo negro para la lista del menú
    }),
  };

  useEffect(() => {
    setMenuPortalTarget(document.getElementById("menu-portal"));
  }, []);
  const [localSearchTerm, setLocalSearchTerm] = useState(searchTerm);
  useEffect(() => {
    setIsMounted(true);
  }, []);
  useEffect(() => {
    dispatch(setSidebarExpanded(isExpanded));
  }, [isExpanded, dispatch]);
  const colorMap: { [key: string]: string } = {
    Blanco: "Blanco",
    Negro: "Negro",
    Nude: "Nude",
    Rojo: "Rojo",
    Rosa: "Rosa",
    Azul: "Azul",
    Marron: "Marrón",
  };

  const colorOptions = [
    { value: "", label: "Selecciona un color" },
    { value: "Blanco", label: "Blanco" },
    { value: "Negro", label: "Negro" },
    { value: "Nude", label: "Nude" },
    { value: "Rojo", label: "Rojo" },
    { value: "Rosa", label: "Rosa" },
    { value: "Azul", label: "Azul" },
    { value: "Marron", label: "Marron" },
  ];

  const marcaOptions = [
    { value: "", label: "Selecciona una marca" },
    { value: "Ruby Rous", label: "Ruby Rous" },
    { value: "Natacha nina", label: "Natacha nina" },
    { value: "Idraet", label: "Idraet" },
    { value: "Prodermic ", label: "Prodermic " },
    { value: "Liderma", label: "Liderma" },
  ];
  interface OptionType {
    value: string;
    label: string;
  }
  interface MyRange {
    min: number;
    max: number;
  }

  const handleSliderChange = (value: number | number[]) => {
    if (Array.isArray(value) && value.length === 2) {
      const newRange: MyRange = { min: value[0], max: value[1] };
      dispatch(setPriceRange([newRange.min, newRange.max]));
    }
  };

  const handleFilterClick = (category: string) => {
    dispatch(setSelectedCategory(category));
  };

  const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newSearchTerm = e.target.value;
    setLocalSearchTerm(newSearchTerm);
    dispatch(setSearchTerm(newSearchTerm));
  };

  useEffect(() => {
    const handleResize = () => {
      const isMobileView = window.innerWidth <= 768;
      setIsMobile(isMobileView);

      if (isMobileView && document.activeElement instanceof HTMLInputElement) {
      } else {
        setIsExpanded(!isMobileView);
        setIsFilterOpen(!isMobileView);
      }
    };

    if (typeof window !== "undefined") {
      handleResize();

      window.addEventListener("resize", handleResize);

      return () => window.removeEventListener("resize", handleResize);
    }
  }, []);

  useEffect(() => {
    if (isBrowser) {
      setMenuPortalTarget(document.getElementById("menu-portal"));
    }
  }, []);
  useEffect(() => {
    if (isBrowser) {
      handleWindowChange();
      window.addEventListener("resize", handleWindowChange);
      window.addEventListener("scroll", handleWindowChange);
    }

    return () => {
      if (isBrowser) {
        window.removeEventListener("resize", handleWindowChange);
        window.removeEventListener("scroll", handleWindowChange);
      }
    };
  }, [handleWindowChange]);
  useEffect(() => {
    if (isFilterOpen) {
      document.body.style.overflow = "auto";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isFilterOpen]);
  useEffect(() => {
    const checkIfMobile = () => {
      const isMobileView = window.innerWidth <= 768;
      setIsMobile(isMobileView);
      if (isMobileView) {
        setIsExpanded(false);
        setIsFilterOpen(false);
      } else {
        setIsExpanded(true);
        setIsFilterOpen(true);
      }
    };

    checkIfMobile();
    window.addEventListener("resize", checkIfMobile);
    return () => window.removeEventListener("resize", checkIfMobile);
  }, []);
  useEffect(() => {
    const portalElement = document.getElementById("menu-portal");
    if (!portalElement) {
      const newPortalElement = document.createElement("div");
      newPortalElement.id = "menu-portal";
      document.body.appendChild(newPortalElement);
      setMenuPortalTarget(newPortalElement);
    } else {
      setMenuPortalTarget(portalElement);
    }
  }, []);
  useEffect(() => {
    dispatch(setSelectedCategory("Todos"));
  }, [dispatch]);

  const handleScroll = useCallback(() => {
    const currentScrollY = window.scrollY;
    setIsButtonVisible(currentScrollY > 200);
    setScrollY(currentScrollY);
    setIsSticky(currentScrollY > 500);

    if (!isMobile) {
      setIsExpanded(currentScrollY === 0);
    }
  }, [isMobile]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll, isMobile]);

  const updateSidebarState = useCallback(() => {
    const atTop = window.scrollY === 0;

    if (isMobile) {
      setIsFilterOpen(atTop);
    } else {
      setIsExpanded(atTop);
    }
  }, [isMobile]);

  useEffect(() => {
    window.addEventListener("scroll", updateSidebarState);
    return () => window.removeEventListener("scroll", updateSidebarState);
  }, [updateSidebarState, isMobile]);

  useEffect(() => {
    if (isMobile && isExpanded) {
      setForceShowScrollbar(true);

      setTimeout(() => setForceShowScrollbar(false), 0);
    }
  }, [isMobile, isExpanded]);

  const handleMouseEnter = () => {
    if (!isMobile && !isColorMenuOpen && !isMarcaMenuOpen) {
      setIsExpanded(true);
    }
  };

  const handleMouseLeave = () => {
    if (
      !isMobile &&
      !isColorMenuOpen &&
      !isMarcaMenuOpen &&
      window.scrollY !== 0
    ) {
      setIsExpanded(false);
    }
  };
  useEffect(() => {
    if (!isFilterOpen) {
      setIsExpanded(false);
      setIsSubMenuOpen(false);
    }
  }, [isFilterOpen]);
  useEffect(() => {
    const updateScrollPosition = () => {
      requestAnimationFrame(() => {
        if (!isMobile) {
          setIsExpanded(window.scrollY === 0);
        }
      });
    };

    window.addEventListener("scroll", updateScrollPosition);
    return () => window.removeEventListener("scroll", updateScrollPosition);
  }, [isMobile]);

  useEffect(() => {
    if (!isExpanded) {
      setIsSelectMenuOpen(false);
      setIsColorMenuOpen(false);
      setIsMarcaMenuOpen(false);
    }
  }, [isExpanded]);
  useEffect(() => {
    const isMobileView = window.innerWidth <= 768;
    setIsMobile(isMobileView);
    if (isMobileView) {
      setIsExpanded(false);
      setIsFilterOpen(false);
    }
  }, []);
  const scrollToSubMenu = () => {
    if (sidebarRef.current) {
      const submenuElement = sidebarRef.current.querySelector(
        ".submenu"
      ) as HTMLElement;

      if (submenuElement) {
        const submenuTop = submenuElement.offsetTop;
        sidebarRef.current.scrollTo({
          top: submenuTop - 20,
          behavior: "smooth",
        });
      }
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        width: "100%",
      }}
    >
      <>
        {isMobile && isButtonVisible && (
          <HamburgerButton
            onClick={() => {
              const newState = !isFilterOpen;
              setIsFilterOpen(newState);
              setIsExpanded(newState);
              setIsSidebarControlledByButton(true);
              dispatch(setSidebarOpenedByButton(newState));
            }}
          >
            {isFilterOpen ? "Ocultar Filtros" : "Mostrar Filtros"}
          </HamburgerButton>
        )}

        <StickyFilterContainer
          ref={sidebarRef}
          isSticky={isSticky}
          isExpanded={isExpanded}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          className={`${isExpanded ? "expanded" : "collapsed"} ${
            isFilterOpen ? "open" : "closed"
          }`}
        >
          <SidebarTitle>Filtros</SidebarTitle>
          <div
            style={{
              display: "flex",
              flexDirection: isMobile ? "column" : "row",
              alignItems: "center",
            }}
          >
            <div style={{ flex: 1 }}>
              <div style={{ position: "relative", marginBottom: "20px" }}>
                <AiOutlineSearch
                  size={24}
                  style={{
                    position: "absolute",
                    left: "10px",
                    top: "50%",
                    transform: "translateY(-50%)",
                    color: "grey",
                  }}
                />
                <FilterInput
                  style={{ paddingLeft: "40px" }}
                  value={localSearchTerm}
                  onChange={handleSearchInputChange}
                  placeholder="Buscar productos..."
                />
              </div>

              <FilterSectionItem className="color-section">
                <label>Colores</label>
                {isMounted && (
                  <Select
                    styles={customStyles}
                    options={colorOptions}
                    menuIsOpen={isColorMenuOpen}
                    onMenuOpen={() => setIsColorMenuOpen(true)}
                    onMenuClose={() => setIsColorMenuOpen(false)}
                    value={colorOptions.find(
                      (option) => option.value === selectedColor
                    )}
                    onChange={(newValue) => {
                      const option = newValue as OptionType | null;
                      const translatedColor =
                        colorMap[option?.value || ""] || "";
                      dispatch(setSelectedColor(translatedColor));
                    }}
                    menuPortalTarget={menuPortalTarget}
                    placeholder="Selecciona un color"
                    components={{
                      MenuList: CustomMenuList,
                      Option: CustomOption,
                    }}
                  />
                )}
              </FilterSectionItem>

              <FilterSectionItem className="brand-section">
                <label>Marcas</label>
                {isMounted && (
                  <Select
                    styles={customStyles}
                    options={marcaOptions}
                    menuIsOpen={isMarcaMenuOpen}
                    onMenuOpen={() => setIsMarcaMenuOpen(true)}
                    onMenuClose={() => setIsMarcaMenuOpen(false)}
                    value={marcaOptions.find(
                      (option) => option.value === selectedMarca
                    )}
                    onChange={(newValue) => {
                      const option = newValue as OptionType | null;
                      dispatch(setSelectedMarca(option?.value || ""));
                    }}
                    menuPortalTarget={menuPortalTarget}
                    placeholder="Selecciona una marca"
                    components={{
                      MenuList: CustomMenuList,
                      Option: CustomOption,
                    }}
                  />
                )}
              </FilterSectionItem>
            </div>

            {!isMobile && (
              <div
                style={{ display: "flex", flexDirection: "column", flex: 2 }}
              >
                <FilterButtons>
                  <button
                    className={selectedCategory === "Todos" ? "active" : ""}
                    onClick={() => handleFilterClick("Todos")}
                  >
                    Todos los productos
                  </button>
                  <button
                    className={selectedCategory === "Ojos" ? "active" : ""}
                    onClick={() => handleFilterClick("Ojos")}
                  >
                    <FaRegEye size={24} style={{ marginRight: "0px" }} />
                    Productos para ojos
                  </button>
                  <button
                    className={selectedCategory === "Rostro" ? "active" : ""}
                    onClick={() => handleFilterClick("Rostro")}
                  >
                    <FaRegSmile size={24} style={{ marginRight: "0px" }} />
                    Productos para rostro
                  </button>
                </FilterButtons>
                <div className="price-section" style={{ marginTop: "20px" }}>
                  <PriceRangeContainer>
                    <Slider
                      className={classes.sliderHorizontal}
                      orientation="horizontal"
                      value={priceRange}
                      onChange={(_: unknown, newValue: number | number[]) =>
                        handleSliderChange(newValue)
                      }
                      valueLabelDisplay="auto"
                      min={0}
                      max={100000}
                      track="inverted"
                    />

                    <PriceRangeInputs>
                      <PriceRangeInput
                        type="number"
                        value={priceRange[0]}
                        onChange={(e) =>
                          dispatch(
                            setPriceRange([+e.target.value, priceRange[1]])
                          )
                        }
                      />
                      <PriceRangeInput
                        type="number"
                        value={priceRange[1]}
                        onChange={(e) =>
                          dispatch(
                            setPriceRange([priceRange[0], +e.target.value])
                          )
                        }
                      />
                    </PriceRangeInputs>
                  </PriceRangeContainer>
                </div>
              </div>
            )}

            {isMobile && (
              <>
                <FilterButtons>
                  <button
                    onClick={() => {
                      toggleSubMenu();
                      scrollToSubMenu();
                    }}
                  >
                    Categorías
                  </button>{" "}
                  {isSubMenuOpen && (
                    <div className="submenu">
                      <button
                        className={selectedCategory === "Todos" ? "active" : ""}
                        onClick={() => handleFilterClick("Todos")}
                      >
                        Todos los productos
                      </button>
                      <button
                        className={selectedCategory === "Ojos" ? "active" : ""}
                        onClick={() => handleFilterClick("Ojos")}
                      >
                        <FaRegEye size={24} style={{ marginRight: "0px" }} />
                        Productos para ojos
                      </button>
                      <button
                        className={
                          selectedCategory === "Rostro" ? "active" : ""
                        }
                        onClick={() => handleFilterClick("Rostro")}
                      >
                        <FaRegSmile size={24} style={{ marginRight: "0px" }} />
                        Productos para rostro
                      </button>
                    </div>
                  )}
                </FilterButtons>
                <div className="price-section">
                  <PriceRangeContainer>
                    <Slider
                      className={classes.sliderHorizontal}
                      orientation="horizontal"
                      value={priceRange}
                      onChange={(_: unknown, newValue: number | number[]) =>
                        handleSliderChange(newValue)
                      }
                      valueLabelDisplay="auto"
                      min={0}
                      max={100000}
                      track="inverted"
                    />

                    <PriceRangeInputs>
                      <PriceRangeInput
                        type="number"
                        value={priceRange[0]}
                        onChange={(e) =>
                          dispatch(
                            setPriceRange([+e.target.value, priceRange[1]])
                          )
                        }
                      />
                      <PriceRangeInput
                        type="number"
                        value={priceRange[1]}
                        onChange={(e) =>
                          dispatch(
                            setPriceRange([priceRange[0], +e.target.value])
                          )
                        }
                      />
                    </PriceRangeInputs>
                  </PriceRangeContainer>
                </div>
              </>
            )}
          </div>
        </StickyFilterContainer>
      </>
    </div>
  );
};

export default CombinedFilterComponent;
