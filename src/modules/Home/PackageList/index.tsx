import {PackageListStyled} from "@/modules/Home/PackageList/PackageList.styled";
import Text from "@/components/Text";
import React from "react";
import PackageItem from "@/modules/Home/PackageList/item";

const PackageList = (props: any) => {
  const { data } = props;
  return (
    <PackageListStyled>
      <Text
        style={{ textTransform: "uppercase" }}
        size="tini"
        fontWeight="medium"
        color="text-secondary"
        className="mb-8"
      >
        Packages
      </Text>
      <div className={"package-content"}>
        {
          data?.map((p: any) => {
            return (
              <PackageItem key={p.id} data={p}>

              </PackageItem>
            )
          })
        }
      </div>
    </PackageListStyled>
  )
}

export default PackageList;