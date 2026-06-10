"use client";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import axios from "axios";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

function Dashboard({ parmas }) {
  const route = useRouter();
  const [product, setProduct] = useState({
    name: "",
    category: "",
    expiryDate: "",
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({ success: true, text: "" });
  const { id } = useParams();

  useEffect(() => {
    const getProduct = async () => {
      try {
        const response = await axios.get(`/api/products/${id}`);
        console.log(response.data.data);

        setProduct(response.data.data);
      } catch (error) {
        console.log(error);
        setErrors({ success: false, text: error.response.data.error });
      }
    };
    getProduct();
  }, [id]);

  const editP = async () => {
    try {
      if (!product.name || !product.category || !product.expiryDate) {
        setErrors({ success: false, text: "all fields are required" });
        return;
      }
      setLoading(true);
      await axios.put(`/api/products/${id}`, product);
      console.log("before push");

      route.push("/dashboard");
      console.log("after push");
    } catch (error) {
      console.log(error);
      setErrors({ success: false, text: error.response.data.error });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-white px-4">
      {/* Stark, minimal card wrapper */}
      <Card className="w-full max-w-md bg-white border border-neutral-200 shadow-sm rounded-2xl p-6">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-semibold tracking-tight text-black">
            Edit Product
          </CardTitle>
          <p className="text-sm text-neutral-500 mt-1">
            Update your reminder details
          </p>
        </CardHeader>

        {/* Global Loading or Error Alert Banners */}
        {(loading || (!errors.success && errors.text)) && (
          <div className="mt-4 p-3 bg-black text-white text-xs font-medium rounded-xl text-center tracking-wide">
            {loading ? "Updating registry changes..." : errors.text}
          </div>
        )}

        <CardContent className="flex flex-col gap-4 text-left mt-6 p-0">
          <form
            className="flex flex-col gap-4"
            onSubmit={(e) => {
              e.preventDefault();
              editP();
            }}
          >
            {/* Item Name Field */}
            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="edit-name"
                className="text-xs font-semibold uppercase tracking-wider text-black"
              >
                Item Name
              </label>
              <input
                type="text"
                id="edit-name"
                placeholder="Product name"
                className="w-full rounded-lg border border-neutral-200 bg-white p-3 text-sm text-black placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-black/10 focus:border-black transition-all"
                value={product.name}
                onChange={(e) =>
                  setProduct({ ...product, name: e.target.value })
                }
              />
            </div>

            {/* Category Dropdown */}
            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="edit-select"
                className="text-xs font-semibold uppercase tracking-wider text-black"
              >
                Category
              </label>
              <select
                id="edit-select"
                className="w-full rounded-lg border border-neutral-200 bg-white p-3 text-sm text-black focus:outline-none focus:ring-2 focus:ring-black/10 focus:border-black transition-all appearance-none cursor-pointer"
                value={product.category}
                onChange={(e) =>
                  setProduct({ ...product, category: e.target.value })
                }
              >
                <option value="null">-- Select category --</option>
                <option value="food">Food</option>
                <option value="medicine">Medicine</option>
                <option value="bills">Bills</option>
                <option value="subscriptions">Subscriptions</option>
                <option value="others">Others</option>
              </select>
            </div>

            {/* Expiry Calendar Selection */}
            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="edit-date"
                className="text-xs font-semibold uppercase tracking-wider text-black"
              >
                Expiry Date
              </label>
              <input
                type="date"
                id="edit-date"
                className="w-full rounded-lg border border-neutral-200 bg-white p-3 text-sm text-black focus:outline-none focus:ring-2 focus:ring-black/10 focus:border-black transition-all cursor-pointer"
                value={
                  product.expiryDate ? product.expiryDate.split("T")[0] : ""
                }
                onChange={(e) =>
                  setProduct({ ...product, expiryDate: e.target.value })
                }
              />
            </div>

            {/* Save Button */}
            <Button
              type="submit"
              variant="default"
              className="w-full mt-2 py-3 font-medium text-sm"
              disabled={loading}
            >
              Save Changes
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

export default Dashboard;
