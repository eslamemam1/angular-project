import {
  AfterViewInit,
  Component,
  ElementRef,
  HostListener,
  ViewChild,
  OnInit,
} from '@angular/core';
import ApexTree from 'apextree';
import {
  DepartmentService,
  Department,
  Employee,
} from '../services/department';

@Component({
  selector: 'app-apex-tree-view',
  templateUrl: './apex-tree-view.html',
  styleUrls: ['./apex-tree-view.css'],
})
export class ApexTreeView implements OnInit, AfterViewInit {
  @ViewChild('apexTreeContainer', { static: false })
  apexTreeContainer!: ElementRef;

  colorCodes = ['#FFFFFF', '#000000', '#f3f4f6', '#e5e7eb'];
  treeData: any;
  treeOptions: any;
  apexTree: any;

  constructor(private departmentService: DepartmentService) {}

  ngOnInit(): void {
    this.departmentService.getDepartments().subscribe((departments) => {
      this.initializeTreeData(departments);
    });
  }

  ngAfterViewInit(): void {
    window.addEventListener('resize', this.reloadTree.bind(this));
  }

  private setCollapsed(nodes: any[]): void {
    nodes.forEach((node) => {
      node.expanded = false;
      if (node.children?.length) this.setCollapsed(node.children);
    });
  }

  initializeTreeData(departments: Department[]): void {
    const map: { [key: string]: any } = {};
    const tree: any[] = [];

    departments.forEach((dep) => {
      map[dep.departmentCode] = {
        id: dep.departmentCode,
        data: { name: dep.nameAr, imageURL: 'department.png' },
        options: {
          nodeBGColor: this.colorCodes[0],
          nodeBGColorHover: this.colorCodes[0],
        },
        children: dep.hasEmployees
          ? dep.employees.map((emp, idx) => ({
              id: `${dep.departmentCode}_EMP_${idx}`,
              data: { name: emp.nameAr, imageURL: 'Employee.png' },
              options: {
                nodeBGColor: this.colorCodes[0],
                nodeBGColorHover: this.colorCodes[0],
              },
              expanded: false,
            }))
          : [],
        expanded: false,
      };
    });

    departments.forEach((dep) => {
      if (dep.parentDepartment && map[dep.parentDepartment]) {
        map[dep.parentDepartment].children.push(map[dep.departmentCode]);
      } else if (!dep.parentDepartment) {
        tree.push(map[dep.departmentCode]);
      }
    });

    this.setCollapsed(tree);

    this.treeData =
      tree.length === 1
        ? tree[0]
        : {
            id: 'ROOT',
            data: { name: 'ROOT', imageURL: 'department.png' },
            children: tree,
            expanded: false,
          };

    this.treeOptions = {
      contentKey: 'data',
      width: '100%',
      height: 700,
      nodeWidth: 150,
      nodeHeight: 70,
      childrenSpacing: 70,
      siblingSpacing: 30,
      fontSize: '12px',
      direction: 'left',
      borderRadius: 8,
      nodeBGColor: this.colorCodes[2],
      nodeBGColorHover: this.colorCodes[3],
      fontColor: this.colorCodes[1],
      borderColor: this.colorCodes[0],
      edgeColor: this.colorCodes[0],
      edgeColorHover: this.colorCodes[0],
      tooltipBorderColor: this.colorCodes[0],
      enableExpandCollapse: true,
      enableToolbar: true,
      nodeTemplate: (content: { imageURL: string; name: string }) => `
        <div class="flex items-center gap-2 h-full rounded-md shadow px-4 bg-white">
          <img class="w-8 h-8 rounded-full" src="${content.imageURL}" alt="">
          <h6 class="text-xs text-gray-600">${content.name}</h6>
        </div>`,
    };

    this.renderTree();
  }

  renderTree(): void {
    if (this.apexTreeContainer)
      this.apexTreeContainer.nativeElement.innerHTML = '';

    this.apexTree = new ApexTree(
      this.apexTreeContainer.nativeElement,
      this.treeOptions
    );
    this.apexTree.render(this.treeData);

    setTimeout(() => {
      this.apexTree?.collapseAll();
      this.apexTree
        .getRoots()
        .forEach((root: any) => this.apexTree.collapse(root.id));
    }, 500);
  }

  reloadTree(): void {
    if (this.apexTree) this.renderTree();
  }

  @HostListener('window:resize')
  onResize(): void {
    this.reloadTree();
  }
}
