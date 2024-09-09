"use client";
import { useContext, useEffect, useRef, useState } from "react";
import {
  getLookupList,
  getProductDetails,
  upsertLookup,
  upsertProduct,
} from "@/shared/api";
import { MdArrowBackIosNew } from "react-icons/md";
import { Category, SubCategory } from "./category";
import {
  Button,
  Dialog,
  DialogOverlay,
  Input,
  DialogContent,
  DialogTrigger,
  Spinner,
} from "@/components/ui";
import DropDown from "@/components/ui/dropdown";
import { useParams, useRouter } from "next/navigation";
import { ComponentTitleBar } from "@/components/custom";
import { FiPlus } from "react-icons/fi";
import { GlobalContext } from "@/context/globalContext";
import { useToast } from "@/components/ui/use-toast";

const CreateProductForm = () => {
  const { toast } = useToast();
  const { categoryList, unitList, setCategoryList } = useContext(GlobalContext);
  const [isLoading, setisLoading] = useState(true);
  const navigate = useRouter();
  const { productId } = useParams();
  const [subCategory, setsubCategory] = useState<any[]>([]);
  const [profileImage, setprofileImage] = useState<any>("");
  const [formData, setFormData] = useState<any>({});
  const uploadRef = useRef<any>(null);
  const [modalData, setmodalData] = useState({
    open: false,
    style: {},
    title: "Category",
    type: "category",
  });

  const fetch = async (productId: string) => {
    try {
      setisLoading(true);
      const { data } = await getProductDetails(productId);
      setFormData(data);
    } catch (err) {
      console.log(err);
    } finally {
      setisLoading(false);
    }
  };

  useEffect(() => {
    if (formData.category) {
      fetchSubCategory(formData.category);
    } else {
      setsubCategory([]);
      setFormData((prev: any) => ({
        ...prev,
        // subCategory: "",
      }));
    }
  }, [formData.category]);

  useEffect(() => {
    if (productId) fetch(productId as string);
    else setisLoading(false);
  }, []);

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((pre: any) => {
      return { ...pre, [name]: value };
    });
  };

  const handleCreate = async () => {
    try {
      const {
        baseUnitLabel,
        secondaryUnitLabel,
        categoryLabel,
        subCategoryLabel,
        ...rest
      } = formData;
      const payload = {
        ...rest,
        createdBy: "b64f413b-c0c6-4b79-b918-68fef0679649",
        updatedBy: "b64f413b-c0c6-4b79-b918-68fef0679649",
      };
      await upsertProduct(payload);
      toast({
        title: "Successfull",
        content: `Product ${productId ? "Updated" : "Created"} Successfully`,
      });
      navigate.back();
    } catch (err) {
      console.log(err);
    }
  };

  const fetchSubCategory = async (categoryId: string) => {
    try {
      const { data } = await getLookupList({
        lookupId: categoryId,
        forLookupValue: true,
      });
      setsubCategory(data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleAddLookup = async (
    data: any,
    type: "category" | "subCategory"
  ) => {
    try {
      const {
        data: { identifiers },
      } = await upsertLookup(data);
      if (type === "category") {
        const newCategory = { label: data.name, value: identifiers[0].id };
        setCategoryList((prec) => [...prec, newCategory]);
      } else {
        const newSubCategory = { label: data.value, value: identifiers[0].id };
        setsubCategory((prev) => [...prev, newSubCategory]);
      }
      handleCloseModel();
    } catch (err) {
      console.log(err);
    }
  };

  const handleCloseModel = () => {
    setmodalData((prev) => ({ ...prev, open: false }));
  };

  if (isLoading) return <Spinner />;
  return (
    <div className="h-full flex gap-2 flex-col">
      <Button onClick={() => navigate.back()} className="w-[min-content]">
        <MdArrowBackIosNew />
        &nbsp; Back
      </Button>
      <ComponentTitleBar title="Create Product" />
      <div className="bg-[#EAEDEF] shadow-md rounded px-8 py-6 overflow-y-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3">
          <div className="col-span-1">
            <div className="gap-4 h-full py-5">
              <div className="flex flex-col h-full items-center">
                <div className="lg:w-4/6 w-3/6 lg:h-2/3 h-[200px] border-2 border-gray-300 rounded flex items-center justify-center">
                  <img
                    src={profileImage}
                    alt="Product"
                    className="h-full w-full p-3"
                  />
                  <Input
                    type="file"
                    className="hidden"
                    ref={uploadRef}
                    onChange={(e) => {
                      e.preventDefault();

                      let reader = new FileReader();
                      let file = (e.target.files || [])[0];
                      reader.onloadend = () => {
                        setprofileImage(reader.result);
                      };
                      file && reader.readAsDataURL(file);
                    }}
                  />
                </div>
                <Button
                  type="button"
                  className="mt-2"
                  onClick={() => {
                    if (uploadRef.current) {
                      console.log(uploadRef.current);
                      uploadRef.current.click();
                    }
                  }}
                >
                  Upload
                </Button>
                <p className="text-gray-500 text-xs mt-1">
                  Max File Size: 5MB
                  <br />
                  Aspect ratio should be 1:1
                </p>
              </div>
            </div>
          </div>
          <div className="col-span-2">
            <div className="grid grid-cols-2 gap-8 mb-4 px-3">
              <Input
                style={{ border: "1px solid #CCCCCC", margin: 0 }}
                label="Product Name"
                onChange={handleChange}
                value={formData?.name}
                name="name"
              />
              <Input
                style={{ border: "1px solid #CCCCCC" }}
                label="SKU"
                onChange={handleChange}
                value={formData?.sku}
                name="sku"
              />
            </div>
            <div className="grid grid-cols-2 gap-8 mb-4 px-3">
              <DropDown
                styles={{
                  option: (base) => {
                    (base.border = "1px solid #CCCCCC"), (base.margin = 0);
                    return base;
                  },
                }}
                className="px-0"
                placeholder="Category"
                label="Category"
                options={categoryList}
                extra={[
                  {
                    label: (
                      <div
                        className="text-[var(--primary)] flex justify-center items-center text-nowrap cursor-pointer"
                        onClick={() =>
                          setmodalData((prev) => ({
                            ...prev,
                            open: true,
                            type: "category",
                            title: "Add Category",
                          }))
                        }
                      >
                        <FiPlus size={15} /> &nbsp; Add New Category
                      </div>
                    ),
                    value: "category",
                    isDisabled: true,
                  },
                ]}
                name="category"
                onChange={(e: any) =>
                  setFormData((pre: any) => ({
                    ...pre,
                    category: e.value,
                  }))
                }
                value={categoryList.find((e) => e.value === formData.category)}
              />
              <DropDown
                isDisabled={!formData.category}
                styles={{
                  option: (base) => {
                    (base.border = "1px solid #CCCCCC"), (base.margin = 0);
                    return base;
                  },
                }}
                isClearable
                className="px-0"
                placeholder="Sub Category"
                label="Sub Category"
                options={subCategory}
                name="subCategory"
                onChange={(e: any) =>
                  setFormData((pre: any) => ({
                    ...pre,
                    subCategory: e ? e.value : null,
                  }))
                }
                value={subCategory.find(
                  (e) => e.value === formData.subCategory
                )}
                extra={[
                  {
                    label: (
                      <div
                        className="text-[var(--primary)] flex justify-center items-center text-nowrap cursor-pointer"
                        onClick={() => {
                          setmodalData((prev) => ({
                            ...prev,
                            open: true,
                            title: "Add Sub Category",
                            type: "subCategory",
                          }));
                        }}
                      >
                        + Add Category
                      </div>
                    ),
                    isFixed: true,
                    value: "subCategory",
                    isDisabled: true,
                  },
                ]}
              />
            </div>
            <div className="grid grid-cols-2 gap-8 mb-4 px-3">
              <DropDown
                styles={{
                  option: (base) => {
                    (base.border = "1px solid #CCCCCC"), (base.margin = 0);
                    return base;
                  },
                }}
                className="px-0"
                placeholder="Base Unit"
                label="Base Unit"
                options={unitList}
                name="baseUnit"
                onChange={(e: any) =>
                  setFormData((pre: any) => ({
                    ...pre,
                    baseUnit: e.value,
                    baseUnitLabel: e.label,
                  }))
                }
                value={unitList.find((e) => e.value === formData.baseUnit)}
              />

              <DropDown
                styles={{
                  option: (base) => {
                    (base.border = "1px solid #CCCCCC"), (base.margin = 0);
                    return base;
                  },
                }}
                className="px-0"
                placeholder="Seco"
                label="Secondry Unit"
                options={unitList}
                name="secondaryUnit"
                onChange={(e: any) =>
                  setFormData((pre: any) => ({
                    ...pre,
                    secondaryUnit: e.value,
                    secondaryUnitLabel: e.label,
                  }))
                }
                value={unitList.find((e) => e.value === formData.secondaryUnit)}
              />
            </div>
            {formData?.secondaryUnit && formData?.baseUnit ? (
              <div className="p-3 mx-3 ">
                1 {formData?.baseUnitLabel} ={" "}
                <input
                  style={{ border: "1px solid #CCCCCC" }}
                  className="w-10 rounded"
                  name="convertionRate"
                  onChange={handleChange}
                  value={formData?.convertionRate}
                />
                {formData?.secondaryUnitLabel}
              </div>
            ) : null}
            <div className="mb-4 px-3">
              <Input
                className="h-[150px]"
                label="Description"
                name="description"
                value={formData?.description}
                onChange={handleChange}
                placeholder="Descriptions"
              />
            </div>
          </div>
        </div>

        <div className="flex items-center justify-end gap-5 mt-4">
          <Button
            type="button"
            variant={"secondary"}
            onClick={() =>
              navigate.push(
                productId ? `/inventory/${productId}` : "/inventory"
              )
            }
          >
            Cancel
          </Button>
          <Button onClick={handleCreate}>
            {productId ? "Update" : "Create"}
          </Button>
        </div>
      </div>
      <Dialog open={modalData.open} onOpenChange={handleCloseModel}>
        <DialogTrigger
          onClick={() => {
            console.log("CLicked");
          }}
        />
        <DialogOverlay>
          <DialogContent>
            {modalData.type === "category" ? (
              <Category
                onSubmit={async (data) => {
                  handleAddLookup({ ...data, type: "category" }, "category");
                }}
                onCancel={handleCloseModel}
              />
            ) : (
              <SubCategory
                onSubmit={(data: any) => {
                  handleAddLookup(
                    { ...data, lookupId: formData.categoryId },
                    "subCategory"
                  );
                }}
                onCancel={handleCloseModel}
              />
            )}
          </DialogContent>
        </DialogOverlay>
      </Dialog>
      {/* <ModalComponent
        onClose={() => {
          setmodalData((prev) => ({ ...prev, open: false }));
        }}
        {...modalData}
      >
        {modalData.type === "category" ? (
          <ModalBody.Category
            onSubmit={async (data: any) => {
              try {
                await createCategory(data);
                // setCategory((prev: any) => [
                //   ...convertStrArrToOptions([data.category]),
                //   ...prev,
                // ]);
              } catch (error) {
              } finally {
                setmodalData({ ...modalData, open: false });
              }
            }}
            onCancel={() => setmodalData((prev) => ({ ...prev, open: false }))}
          />
        ) : (
          <ModalBody.SubCategory
            onSubmit={async (data: any) => {
              try {
                const { subCategory } = data;
                const payload = { category: formData?.category, subCategory };
                await createSubCategory(payload);
                setsubCategory((prev) => [
                  ...convertStrArrToOptions([subCategory]),
                  ...prev,
                ]);
              } catch (err) {
              } finally {
                setmodalData({ ...modalData, open: false });
              }
            }}
            onCancel={() => setmodalData((prev) => ({ ...prev, open: false }))}
          />
        )}
      </ModalComponent> */}
    </div>
  );
};

export default CreateProductForm;
