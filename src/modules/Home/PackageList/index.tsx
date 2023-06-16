import {PackageListStyled} from "@/modules/Home/PackageList/PackageList.styled";
import Text from "@/components/Text";
import React, {useEffect, useState} from "react";
import PackageItem from "@/modules/Home/PackageList/item";
import {IPackage} from "@/modules/Home/SubmitForm";

const PackageList = (props: any) => {
  const { data, onSelect } = props;
  const [selectedItem, setSelectedItem] = useState<IPackage>();

  useEffect(() => {
    if(data?.length > 0) {
      setSelectedItem(data[0]);
    }
  }, [JSON.stringify(data)]);

  useEffect(() => {
    onSelect && onSelect(selectedItem);
  }, [JSON.stringify(selectedItem)])

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
              <PackageItem key={p.id} data={p} onClick={() => setSelectedItem(p)} isSelected={selectedItem?.id === p.id}/>
            )
          })
        }
      </div>
    </PackageListStyled>
  )
}

export default PackageList;